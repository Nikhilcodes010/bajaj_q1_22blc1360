// main.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
    try {
        
        const data = req.body.data;

        
        if (!data || !Array.isArray(data)) {
            
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = '';

        data.forEach(item => {
            
            if (!isNaN(parseFloat(item)) && isFinite(item)) {
                const num = parseInt(item, 10);
                
                sum += num;
                
                if (num % 2 === 0) {
                    even_numbers.push(String(num));
                } else {
                    odd_numbers.push(String(num));
                }
            }
            
            else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                
                alphabets.push(item.toUpperCase());
                
                alphabet_string += item;
            }
            
            else {
                special_characters.push(item);
            }
        });

        let reversed_string = alphabet_string.split('').reverse().join('');
        let concat_string = '';

        for (let i = 0; i < reversed_string.length; i++) {
            if (i % 2 !== 0) {
                concat_string += reversed_string[i].toUpperCase();
            } else {
                concat_string += reversed_string[i].toLowerCase();
            }
        }


        const response = {
            "is_success": true,
            "user_id": "nikhil_ramachandran_17091999", 
            "email": "nikhilcodes010.com",
            "roll_number": "22BLC1360", 
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": String(sum),
            "concat_string": concat_string
        };

        // Send the successful response with a 200 OK status
        res.status(200).json(response);

    } catch (error) {
        
        console.error("An error occurred:", error);
        // Send a 500 Internal Server Error response if anything goes wrong
        res.status(500).json({
            is_success: false,
            error: "Internal Server Error"
        });
    }
});

//START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
