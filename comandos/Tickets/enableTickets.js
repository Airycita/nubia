module.exports = {
    name: "enable-tickets",
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
        #(if #(getGuildVar isEnabled | tickets | #(guild id)) == true |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription El sistema de tickets ya se encuentra encendido.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(setGuildVar isEnabled | true | tickets | #(guild id))
        #(send
            #(newEmbed
                #(setTitle Sistema encendido.)
                #(setDescription El sistema de tickets ahora puede funcionar.)
                #(setColor #(getVar redDark | colors))
            )
        )
    `
}