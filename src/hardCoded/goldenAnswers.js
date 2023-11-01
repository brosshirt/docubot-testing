export const goldenAnswers = [
    {
        question: `What's the syntax for allowing my panel to accept parameters?`,
        articleIds: [6862, 25750],
        points: 
        `Correct-Points: """
            - You should use the parm rule
            - The syntax for the parm rule is similar to "parm(in: &varName)" (note: in the actual response, it’s possible that &varName is replaced with another name and that “in” is replaced with “inout” or “out”, these changes should not affect the accuracy of the response)
        """
        Incorrect-Points: """
            - *Offers lists of valid rules for web panels and work panels
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
            - The row style is used to change the general style of the row
            - The column style is used to change the general style of the column
            - Something about using a class or a theme
        """`,
        evaluateJSON: {
            green:{
                minimumCorrect: 2,
                maximumIncorrect: 0
            },
            yellow:{
                minimumCorrect: 1,
                maximumIncorrect: 3
            }
        }
    },
    {
        question: `How do I convert a character variable to a numeric variable`,
        articleIds: [12717, 8528],
        points: 
        `Correct-Points: """
            - You can use the toNumeric method
            - The toNumeric method is used with syntax similar to &myNum = &myTxt.toNumeric, (note: The variable names &myNum and &myTxt might be different in the provided response, this does not affect the accuracy of the response)
            - You can use the Val function
            - The syntax for the Val function is similar to &myNum = Val(&myTxt), (note: The variable names &myNum and &myTxt might be different in the provided response, this does not affect the accuracy of the response)
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
                minimumCorrect: Number.MAX_SAFE_INTEGER,
                maximumIncorrect: Number.MIN_SAFE_INTEGER
            }
        }
    },
    {
        question: `How do I round my variable &myVar up to the nearest 2 decimal places`,
        articleIds: [12726, 8486],
        points: 
        `Correct-Points: """
         - You can use the Round function
         - You can round &myVar to the nearest 2 decimal places with syntax similar to &myVar = Round(&myVar, 2). (note: The variable name &myVar might be different in the provided response, this does not affect the accuracy of the response)
         - You can use the Round method
         - You can  round &myVar to the nearest 2 decimal places with syntax similar to &myVar.Round(2). (note: The variable name &myVar might be different in the provided response, this does not affect the accuracy of the response)
        """
        Incorrect-Points """
         - *The response offers syntax similar to Round(numeric-expression, nK) as a general rule and then puts it into practice with mismatched syntax similar to &myVar = &myVar.Round(2) 
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
        - Something about java reports and jar files
        - A code snippet to put in the source section of your procedure
        """
        `,
        evaluateJSON: {
            green:{
                minimumCorrect: 4,
                maximumIncorrect: 1
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
        - You should use syntax similar to 
                “For each Region
                    print myPrintblock
                Endfor” 
            where Region and myPrintblock are variable names that are interchangeable
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
        - An example in which two subtype groups are created so that a transaction can make multiple references to the same transaction
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
        articleIds: [53067, 7221, 49076],
        points: 
        `Correct-Points: """
        - You can use a domain 
        - Steps on how to create your domain
        """
        Incorrect-Points: """
        - Something about creating a new transaction object and defining its attributes
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
        question: `I have a transaction “Store” and another transaction “Item,” I would like each Store to have a list of Items associated with it. What’s the typical way of accomplishing this in GeneXus`,
        articleIds: [42569],
        points: 
        `Correct-Points: """
        - You can add a second level to your “Store” transaction
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





