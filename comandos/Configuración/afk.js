module.exports = [{
    name: 'enable-afk',
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
        #(if #(getGuildVar estado | afk | #(guild id)) == habilitado |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription Las características AFK ya se encuentran habilitadas.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(setGuildVar estado | habilitado | afk | #(guild id))
        #(send
            #(newEmbed
                #(setTitle Característica AFK habilitada con éxito.)
                #(setDescription Todos los miembros de este servidor podrán usar los comandos AFK.)
                #(setColor #(getVar greenDark | colors))
            )
        )
    `
},{
    name: 'disable-afk',
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
        #(if #(getGuildVar estado | afk | #(guild id)) == deshabilitado |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription Las características AFK ya se encuentran deshabilitadas.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(setGuildVar estado | deshabilitado | afk | #(guild id))
        #(send
            #(newEmbed
                #(setTitle Característica AFK deshabilitada con éxito.)
                #(setDescription Nadie en este servidor podrá usar los comandos AFK.)
                #(setColor #(getVar greenDark | colors))
            )
        )
    `
}]