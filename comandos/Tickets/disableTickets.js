module.exports = {
    name: "disable-tickets",
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
        #(if #(getGuildVar isEnabled | tickets | #(guild id)) == false |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription El sistema de tickets ya se encuentra apagado.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(setGuildVar isEnabled | false | tickets | #(guild id))
        #(send
            #(newEmbed
                #(setTitle Sistema apagado.)
                #(setDescription El sistema de tickets ya no funciona en este servidor.)
                #(setColor #(getVar redDark | colors))
            )
        )
    `
}