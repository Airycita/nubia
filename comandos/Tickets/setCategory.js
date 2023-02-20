module.exports = {
    name: "set-ticket-category",
    code: `
        #(if #(hasPerm Administrator | #(author) | #(guild)) == false |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription No tienes suficientes permisos para ejecutar este comando.
                    %BR%**Permiso requerido:** \`Administrador\`)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(if #(getGuildVar isEnabled | tickets | #(guild id)) == false |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription El sistema de tickets no está encendido.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
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
        #(try
            #(if #(isCategory #(resolveChannel #(args) | id | #(guild))) == false |
                #(send
                    #(newEmbed
                        #(setTitle ID inválida.)
                        #(setDescription La ID no pertenece a una categoría válida.)
                        #(setColor #(getVar redDark | colors))
                    )
                )
                #(break)
            )
            #(setGuildVar category | #(resolveChannel #(args) | id | #(guild)) | tickets | #(guild))
            #(send
                #(newEmbed
                    #(setTitle Categoría configurada.)
                    #(setDescription Los tickets se abrirán en esa categoría.)
                    #(setColor #(getVar greenDark | colors))
                )
            )
        |
            #(send
                #(newEmbed
                    #(setTitle ID inválida.)
                    #(setDescription La ID no pertenece a una categoría válida.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
    `
}