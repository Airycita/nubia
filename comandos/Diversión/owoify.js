module.exports = {
    name: "owoify",
    code: `
    #(if #(argsCount) == 0 | 
        #(send
            #(newEmbed
                #(setTitle Argumentos faltantes.)
                #(setDescription ¡Debes escribir un texto!)
                #(setColor #(getVar redDark | colors))
            )    
        )
        #(break)
    )
    #(set owoified | #(replace #(replace #(replace #(replace #(args) | R | W) | L | W) | r | w) | l | w))
    #(send 
        #(get owoified)
        #(newActionRow
            #(addButton secondary | Enviado por: #(author tag) | cmo | true)
        )
    )
    `
}