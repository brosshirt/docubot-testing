export const goldenAnswers = [
    {
        question: `What's the syntax for allowing my panel to accept parameters?`,
        articleIds: [6862, 25750],
        points: 
        `Correct-Points: """
            - *The answer explicitly mentions the "parm rule"
            - The syntax for the parm rule is "parm([direction]: [variable_name])" where "direction": ['in', 'out', 'inout'] and "variable_name": any string
        """
        Incorrect-Points: """
            - *The answer explicitly lists more than 2 acceptable rules that can be used
        """`,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            }
        }
    },
    {
        question: `I have a table with the properties “row style” and “column style”, can you please tell me what these properties do?`,
        articleIds: [19487],
        points: 
        `Correct-Points: """
            - The values for the row style property can be expressed using %, dip, or pd
            - The values for the column style property can be expressed using %, dip, or pd        
        """
        Incorrect-Points: """
            - *The response contains something about changing the general style of a row or column
            - Something about using a class or a theme
        """`,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I convert a character variable to a numeric variable`,
        articleIds: [12717, 8528],
        points: 
        `Correct-Points: """
            - You can use the toNumeric method
            - The syntax for the toNumeric methFod is "[variable_name] = [variable_name].toNumeric()" where "variable_name": any string
            - You can use the Val function
            - The syntax for the Val function is "[variable_name] = Val([variable_name])" where "variable_name": any string
        """
        Incorrect-Points: """
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I round my variable &myVar up to the nearest 2 decimal places`,
        articleIds: [12726, 8486],
        points: 
        `Correct-Points: """
         - You can use the Round function
         - An appropriate syntax is "Round([variable_name], [decimal_places])" where "variable_name": any string and "decimal_places": any value
         - You can  round &myVar to the nearest 2 decimal places with syntax similar to &myVar.Round(2). (note: The variable name &myVar might be different in the provided response, this does not affect the accuracy of the response)
         - An appropriate syntax is "[variable_name].Round([decimal_places])" where "variable_name": any string and "decimal_places": any value
         """
        Incorrect-Points """
         - *The response offers syntax "[variable_name] = Round([variable_name], [decimal_places])" as a general rule and then puts it into practice with mismatched syntax "[variable_name].Round([decimal_places])"
        """`,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `I have a transaction Regions and I need to display and download a PDF file with every Region in our DB in a list. Tell me which GeneXus object to use and how to configure it.`,
        articleIds: [13531],
        points: 
        `Correct-Points: """
        - You can use a procedure object
        - You need to set the main program property to true
        - You need to set the output_file rule
        - You need to set the call protocol property to HTTP
        """
        Incorrect-Points """
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 4,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `What is the layout tab in a procedure object and how do I set it up if I want to print every attribute related to every record of my transaction "Region"`,
        articleIds: [5468],
        points: 
        `Correct-points: """
        - The layout determines the visual output of the procedure
        - You can insert attributes into a print block
        """
        Incorrect-points: """
        - For each attribute you want to add, insert a new print block, keep adding print blocks for each attribute
        - *The response instructs you to insert specifically named attributes into the printblock (ex. “You need to insert the attributes ‘AirplaneId’ and ‘AirplaneName’”)
        """        
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `I have a printblock in my layout of my procedure, it contains all of the attributes for my transaction. Write me the code in the source section to print out all of the attributes for every Region in my DB`,
        articleIds: [5479],
        points: 
        `Correct-points: """
        - You should use the for each command
        - You should use syntax  "
                For each [transaction_name]
                    print [printblock_name]
                Endfor
            " 
            where "transaction_name": any string and "printblock_name" any string
        """
        Incorrect-points: """
        - You should use nested for each commands
        """   
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            }
        }
    },
    {
        question: `What are subtypes and how can I use them to implement a transaction that has 2 attributes with foreign keys to the same transaction.`,
        articleIds: [2213, 20206],
        points: 
        `Correct-Points: """
        - Subtypes allow you define separate names for the same attribute
        - Subtypes are defined using Subtype Groups
        - A detailed and concrete example in which two subtype groups are created so that a transaction can make multiple references to the same transaction
        """
        Incorrect-Points: """
        """   
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 3,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I create my own data type in GeneXus? I would like to create my own type “ID” that I use in various transactions so that I don’t need to continually set the same properties for my attributes over and over again.`,
        articleIds: [53067, 34180, 49076],
        points: 
        `Correct-Points: """
        - *The answer explicitly mentions the use of a "Domain" 
        - Steps on how to create your domain
        """
        Incorrect-Points: """
        - *The answer explicitly recommends the creation of a new transaction
        - *The answer includes a for each command
        """
        
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `I have a transaction “Store” and another transaction “Item,” I would like each Store to have a list of Items associated with it. What’s the typical way of accomplishing this in GeneXus`,
        articleIds: [42569],
        points: 
        `Correct-Points: """
        - *The response clearly suggests the addition of a "level" to the Store transaction 
        - You must right click and then click “Insert level”
        """
        Incorrect-Points: """
        - You can solve the problem by including an attribute in the “item” transaction
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `Write the code to display the date that is 3 years before the current date`,
        articleIds: [8317, 12673], 
        points: 
        `Correct-Points: """
            - Mentions that you can use the AddYr function
            - Offers syntax for the addYr function like "AddYr([date], [yearsToAdd])" where "date": any date object including Today() or Now() and "yearsToAdd": any number 
            - Mentions that you can use the AddYears method
            - Offers syntax for the AddYears method like [final_date] = [initial_date].AddYears([years]) where "final_date": date object, "initial_date" is a date object, "years": any number
            - *The response offers a code solution that uses the YMDtoD function and syntax [date].Year() where date is a date object
        """
        Incorrect-Points: """
            - *The response says "AddYear" instead of "AddYr"
            - *The response uses syntax like Year([date])
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            }
        }
    },
    {
        question: `Write the code to concatenate two variables &CongratulationsMessage and &Username with a space in between them`,
        articleIds: [8352],
        points: 
        `Correct-Points: """
            - Offers syntax for the Concat function 
            - Offers syntax using the + operator like &CongratulationsMessage + ' ' + &Username
        """
        Incorrect-Points: """
            - Offers syntax like "Concat(&CongratulationsMessage,' ',&Username)" with the space as the second parameter
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: 1
            }
        }
    },
    {
        question: `Write the code to get the last four digits of a string variable &SocialSecurityNumber`,
        articleIds: [8527, 12713],
        points: 
        `Correct-Points: """
            - Offers syntax for the Substr function like "SubStr(&SocialSecurityNumber,[startIndex],4) "startIndex": anything that evaluates to a number
            - Offers syntax for the Substring method like "&SocialSecurityNumber.Substring([startIndex], 4) "startIndex": anything that evaluates to a number
        """
        Incorrect-Points: """
            - *The response uses a length function syntax that isn't ".length()" such as "len()", "Len()" or "length" (without the parenthesis)
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I get the ascii representation for a character in GeneXus`,
        articleIds: [13973, 6852],
        points: 
        `Correct-Points: """
            - You can use the Asc function
            - The syntax for the Asc function is "Asc([myString])" where "myString": Any string
        """
        Incorrect-Points: """
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I define my transaction to throw an error message if the user tries to delete a record`,
        articleIds: [8328, 6852],
        points: 
        `Correct-Points: """
            - The syntax is "Error([errorMessage],[optional_parameteter]) If Delete [other_conditions]; where "errorMessage": Any string "optional_parameter" and be blank or a string and [other_conditions] can be blank or a string representing other conditions for the if statement
        """
        Incorrect-Points: """
            - *The solution offers a long code sample different from the Error([errorMessage],[optional_parameteter]) sample that is meant to for more advanced error detection and reporting
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I change the color of the text in my textblock within my panel, I'm using design systems`,
        articleIds: [52179, 47379, 49309],
        points: 
        `Correct-Points: """
            - You should write css-style code in the "styles" section of your design system object to define the "color" property for a particular class
            - Change the "class" of your TextBlock control for the styles you wrote to take effect 
            - *The response explicitly shows syntax similar to [TextBoxName].Class = "[ClassName]" where "TextBoxName" is any string and "ClassName" is any string
        """"
        Incorrect-Points: """
            - *The response uses the var function like  var([var_name]);
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 3,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 2,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I use the query object and queryViewer object to display a pie chart showing the number of cities associated with various countries, for example.`,
        articleIds: [33991],
        points: 
        `Correct-Points: """
            - In your query object, add attributes under the attributes node
            - The attribute you use related to "cities" should be wrapped in a count() function in order to get the number of cities
            - Set the object property of your QueryViewer to the name of the query object that you just created
        """"
        Incorrect-Points: """
            - *The response explicitly mentions "Attraction"
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 3,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: Number.MAX_SAFE_INTEGER
            }
        }
    },
    { // Eso es un ejemplo bueno de una pregunta que se va a poder contestar aún mejor cuando se puede leer imágenes
        question: `How do I implement dark mode in my application? I'm using design systems`,
        articleIds: [48692, 48693],
        points: 
        `Correct-Points: """
            - *The response suggests the need to define a color scheme parameter
            - *The response specifically mentions "tokens" taking different color values depending on the value of your color scheme variable 
            - You can modify the value of your color scheme variable at runtime
            - *The answer provides the syntax "tokens [designSystemName] (color-scheme: [light]|dark)" where "designSystemName": any string
            - *The answer provides the syntax @color-scheme = [color-scheme]{[token_definitions]} where "color-scheme": your variable managing color scheme and "token_definitions" are your pseudo-css token definitions
            - *The answer provides the syntax DesignSystem.setOption("color-scheme", [value]) where "value": Light | Dark
        """"
        Incorrect-Points: """
            - *The answer contains a LIST of steps that includes something about converting an existing theme object into a design system object
            - *The answer contains syntax "[token_definitions] when @Light, [token_defitinitions] when @Dark" where "token_definitions" are the definitions for the tokens
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 6,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 3,
                maximumIncorrect: 0
            }
        }
    },
    { // Eso es un ejemplo bueno de una pregunta que se va a poder contestar aún mejor cuando se puede leer imágenes
        question: `I have a panel called "Photo." I have another panel called "Home." In the panel "Home," I have a component control called "MyComponent." When "Home" runs for the first time, I would like the content of "Photo" to be displayed inside of "MyComponent". Can you provide me with the syntax to make this happen?`,
        articleIds: [5404, 7011, 8359, 20509],
        points: 
        `Correct-Points: """
            - *The answer provides the syntax "[component_name].Object = [panel_name].create([optional_parameters])" where "component_name": string, "panel_name": string, "optional_parameters": Can be blank or list of parameters
            - *The answer provides the syntax "[component_name].Object = Create([panel_name],[optional_parameters])" where "component_name": string, "panel_name": string, "optional_parameters": Can be blank or list of parameters
            - *The answer provides the syntax "[component_name].Object = CreateFromURL([link])" where "component_name": string, "link": string
        """"
        Incorrect-Points: """
            - *The answer provides the syntax [component_name].Object = [panel_name] without ever using the keyword "create"
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 1,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: Number.MAX_SAFE_INTEGER,
                maximumIncorrect: Number.MIN_SAFE_INTEGER
            }
        }
    },
    

]





