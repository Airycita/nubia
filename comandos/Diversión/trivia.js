module.exports = [{
    name: "trivia",
    code: `
    #(if 1 != 2 |
        #(send
            #(newEmbed
                #(setTitle Acción denegada.)
                #(setDescription El comando está inhabilitado temporalmente.)
                #(setColor #(getVar redDark | colors))
            )
        )
        #(break)
    )
    #(try
        #(newObject request | #(httpsGet https://opentdb.com/api.php?amount=10))
        #(newRawArray triviaArr | #(objectProperty request | results))
        #(newObject object | #(arrayGet triviaArr | 1))
        #(newRawArray incorrectArr | #(objectProperty object | incorrect_answers))
        #(set random | #(random 1 | 4))
        #(set msg | 
            #(send
                #(newEmbed
                    #(setTitle Trivia: #(translate en | es | #(objectProperty object | category)))
                    #(setDescription #(translate en | es | #(objectProperty object | question)))
                    #(setColor #(getVar blueDark | colors))
                )
                #(newActionRow
                    #(if #(get random) == 1 |
                        #(addButton secondary | #(objectProperty object | correct_answer) | correct_#(author) | false)
                        #(addButton secondary | #(arrayGet incorrectArr | 1) | incorrect1_#(author) | false)
                        #(addButton secondary | #(arrayGet incorrectArr | 2) | incorrect2_#(author) | false)
                        #(addButton secondary | #(arrayGet incorrectArr | 3) | incorrect3_#(author) | false)
                    | 
                        #(if #(get random) == 2 |
                            #(addButton secondary | #(arrayGet incorrectArr | 1) | incorrect1_#(author) | false)
                            #(addButton secondary | #(objectProperty object | correct_answer) | correct_#(author) | false)
                            #(addButton secondary | #(arrayGet incorrectArr | 2) | incorrect2_#(author) | false)
                            #(addButton secondary | #(arrayGet incorrectArr | 3) | incorrect3_#(author) | false)
                        |
                            #(if #(get random) == 3 |
                                #(addButton secondary | #(arrayGet incorrectArr | 1) | incorrect1_#(author) | false)                            
                                #(addButton secondary | #(arrayGet incorrectArr | 2) | incorrect2_#(author) | false)
                                #(addButton secondary | #(objectProperty object | correct_answer) | correct_#(author) | false)
                                #(addButton secondary | #(arrayGet incorrectArr | 3) | incorrect3_#(author) | false)
                            |
                                #(addButton secondary | #(arrayGet incorrectArr | 1) | incorrect1_#(author) | false)                            
                                #(addButton secondary | #(arrayGet incorrectArr | 2) | incorrect2_#(author) | false)
                                #(addButton secondary | #(arrayGet incorrectArr | 3) | incorrect3_#(author) | false)
                                #(addButton secondary | #(objectProperty object | correct_answer) | correct_#(author) | false)
                            )
                        )
                    )
                )
            | #(channel id) | true)
        )
        #(setMessageVar correcta | #(objectProperty object | correct_answer) | trivia | #(get msg))
        #(setMessageVar incorrectas | #(arrayGet incorrectArr | 1),#(arrayGet incorrectArr | 2),#(arrayGet incorrectArr | 3) | trivia | #(get msg))
        #(setMessageVar object | #(arrayGet triviaArr | 1) | trivia | #(get msg))
    |
        #(send
            #(newEmbed
                #(setTitle Error inesperado.)
                #(setDescription No se pudo obtener respuesta de la API.)
                #(setColor #(getVar yellowDark | colors))
            )
        )
    )
    
    `
},{
    type: "interaction",
    code: `
        #(if #(includes #(interaction customId) | correct_) == false |
            #(break)
        )
        #(if #(includes #(interaction customId) | #(author id)) == false |
            #(interactionReply 
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription ¡No seas aguafiestas! 
                    %BR%No puedes arruinar la trivia de alguien más)
                    #(setFooter Intenta a usar el comando trivia.)
                    #(setColor #(getVar redDark | colors))
                )
            | true | false)
            #(break)
        )
        #(set puntos | #(calculate #(getMemberVar puntos | trivia | #(author id)) + 1))
        #(setMemberVar puntos | #(get puntos) | trivia | #(author id))
        #(newObject obj | #(getMessageVar object | trivia | #(message id)))
        #(interactionUpdate
            #(newEmbed
                #(setTitle Trivia: #(objectProperty obj | category))
                #(setDescription #(translate en | es | #(objectProperty obj | question)))
                #(setFooter Correcto: #(objectProperty obj | correct_answer) %BAR% Puntos: #(get puntos))
                #(setColor #(getVar greenDark | colors))
            )
        | true)
    `
},{
    type: "interaction",
    code: `
        #(if #(includes #(interaction customId) | incorrect) == false |
            #(break)
        )
        #(if #(includes #(interaction customId) | #(author id)) == false |
            #(interactionReply 
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription ¡No seas aguafiestas! 
                    %BR%No puedes arruinar la trivia de alguien más)
                    #(setFooter Intenta a usar el comando trivia.)
                    #(setColor #(getVar redDark | colors))
                )
            | true | false)
            #(break)
        )
        #(newObject obj | #(getMessageVar object | trivia | #(message id)))
        #(interactionUpdate
            #(newEmbed
                #(setTitle Trivia: #(objectProperty obj | category))
                #(setDescription #(translate en | es | #(objectProperty obj | question)))
                #(setFooter Incorrecto, la respuesta correcta es: #(objectProperty obj | correct_answer))
                #(setColor #(getVar redDark | colors))
            )
        | true)
    `
}]