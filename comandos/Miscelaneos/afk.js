module.exports = [{
    name: 'afk',
    code: `
        #(if #(getGuildVar estado | afk | #(guild id)) == deshabilitado |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription Las características AFK están inhabilitadas en este servidor.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(set time | #(round #(calculate #(round #(nowTime)) / 1000)))
        #(set razón | #(if #(argsCount) == 0 | Sin razón dada. | #(unescape #(args))))
        #(setMemberVar userEstado | habilitado | afk | #(author id) | #(guild id))
        #(setMemberVar tiempo | #(get time) | afk | #(author id) | #(guild id))
        #(setMemberVar razon | #(get razón) | afk | #(author id) | #(guild id))
        #(send
            #(newEmbed
                #(setTitle AFK Habilitado.)
                #(setThumbnail #(author avatar))
                #(setDescription Avisaré a todo aquel que te mencione.
                    %BR%Razón: #(get razón)
                    %BR%Tiempo: <t:#(get time):R>    
                )
                #(setColor #(getVar greenDark | colors))
            )
        )
    `
},{
    type: 'alwaysExecute',
    code: `
        #(if #(getGuildVar estado | afk | #(guild id)) == deshabilitado |
            #(break)
        )
        #(try
            #(if #(getMemberVar userEstado | afk | #(mentionedUser 1) | #(guild id)) == habilitado |
                #(set tiempo | #(getMemberVar tiempo | afk | #(mentionedUser 1) | #(guild id)))
                #(set razón | #(getMemberVar razon | afk | #(mentionedUser 1) | #(guild id)))
                #(send
                    #(newEmbed
                        #(setTitle Hey, no molestes...)
                        #(setDescription #(mentionedUser 1 | name) está AFK.
                            %BR%Desde <t:#(get tiempo):R>
                            %BR%Con la razón: \`#(get razón)\`
                        )
                        #(setColor #(getVar redDark | colors))
                    )
                )
            )
        |
            #(set catcher | null)
        )
        #(if #(getMemberVar userEstado | afk | #(author id) | #(guild id)) == habilitado |
            #(set tiempo | #(getMemberVar tiempo | afk | #(author id) | #(guild id)))
            #(set razón | #(getMemberVar razon | afk | #(author id) | #(guild id)))
            #(send
                #(newEmbed
                    #(setTitle AFK removido.)
                    #(setThumbnail #(author avatar))
                    #(setDescription ¡Bienvenido de vuelta #(author name)!
                        %BR%Estuviste AFK <t:#(get tiempo):R>
                        %BR%Con la razón: \`#(get razón)\`
                    )
                    #(setColor #(getVar greenDark | colors))
                )
            )
            #(setMemberVar userEstado | deshabilitado | afk | #(author id) | #(guild id))
        )
    `
}]