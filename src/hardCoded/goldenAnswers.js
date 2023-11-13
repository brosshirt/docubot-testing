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
            - The row style property is used to change the size of the rows
            - The column style property is used to change the size of the columns
            - The values for the row style property can be expressed using %, dip, or pd
            - The values for the column style property can be expressed using %, dip, or pd        
        """
        Incorrect-Points: """
            - *The response contains something about changing the general style of a row or column
            - Something about using a class or a theme
        """`,
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
        question: `How do I convert a character variable to a numeric variable`,
        articleIds: [12717, 8528],
        points: 
        `Correct-Points: """
            - You can use the toNumeric method
            - The syntax for the toNumeric method is "[variable_name] = [variable_name].toNumeric()" where "variable_name": any string
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
         - An appropriate syntax is "[variable_name] = Round([variable_name], [decimal_places])" where "variable_name": any string and "decimal_places": any value
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
        - *The response clearly suggests the addition of a level to the Store transaction
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
]





