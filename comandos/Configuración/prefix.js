module.exports = [{
    name: 'prefix',
    aliases: ['set-prefix'],
    code: `
        #(if #(hasPerm Administrator | #(author) | #(guild)) == false |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription No tienes permisos suficientes.
                    %BR%**Permiso requerido:** \`Administrador\`)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(if #(stringLength #(unescape #(args))) == 0 | 
            #(send
                #(newEmbed
                    #(setTitle Argumentos faltantes.)
                    #(setDescription Debes escribir el nuevo prefijo para este servidor.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )

        #(if #(stringLength #(unescape #(args))) > 5 | 
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription El prefijo no puede ser muy largo, sólo puede contener 5 caracteres.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )

        #(set oldPrefix | #(getGuildVar prefix | bot))
        #(setGuildVar prefix | #(unescape #(args)) | bot)
        #(set newPrefix | #(getGuildVar prefix | bot))
        #(send
            #(newEmbed
                #(setTitle Prefijo configurado con éxito.)
                #(setDescription Se cambió el prefijo de \`#(get oldPrefix)\` a \`#(get newPrefix)\`)
                #(setColor #(getVar greenDark | colors))
            )
        )
    `
}]
/*
#(if #(jsEval /^[A-Za-z0-9\s]+$/.test('#(unescape #(args))')) == false |
    #(send
        #(newEmbed
            #(setTitle #(getVar wrong | emojis) %BAR% Acción denegada.)
            #(setDescription El prefijo no puede contener caracteres especiales.)
            #(setColor #(getVar redDark | colors))
        )
    )
    #(break)
)
*/