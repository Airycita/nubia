module.exports = {
    name: "userinfo",
    aliases: ['user-info', 'whois'],
    code: `
        #(set fetcher | #(allGuildMembers))
        #(set target | #(replace #(replace #(parseCondition #(argsCount) == 0) | true | #(author id)) | false | #(resolveUser #(args) | id)))
        #(if #(get target) == |
            #(send
                #(newEmbed
                    #(setTitle Acción no posible.)
                    #(setDescription El usuario provisto no existe o no se pudo encontrar.)
                    #(setColor #(getVar redDark | colors))
                )
            )
        |
            #(try
                #(send
                    #(newEmbed
                        #(setTitle #(user tag | #(get target)))
                        #(setThumbnail #(member avatar | #(get target)))
                        #(setDescription ***ID:*** \`#(member id | #(get target))\`
                        %BR%***Fecha de creación:*** <t:#(round #(calculate #(user createdTimestamp | #(get target)) / 1000) | 0):F> (<t:#(round #(calculate #(user createdTimestamp | #(get target)) / 1000) | 0):R>)
                        %BR%***Unión al servidor:*** <t:#(round #(calculate #(member joinedTimestamp | #(get target)) / 1000) | 0):F> (<t:#(round #(calculate #(member joinedTimestamp | #(get target)) / 1000) | 0):R>)
                        %BR%***¿Está silenciado?*** #(if #(member isTimeouted | #(get target)) == true | \`Si, está silenciado.\`%BR%Aislamiento termina <t:#(round #(calculate #(member timeoutTimestamp | #(get target)) / 1000) | 0):R> | \`No está silenciado.\`)
                        %BR%%BR%**Estadísticas**
                        %BR%***Conteo de actividades:*** \`#(member activitiesCount | #(get target))\`
                        %BR%***Conteo de roles:*** \`#(member rolesCount | #(get target))\`
                        )
                        #(setColor #(getVar blueNotSoSoDark | colors))
                    )
                )
            |
                #(send
                    #(newEmbed
                        #(setTitle Acción no posible.)
                        #(setDescription El usuario provisto no existe o no se pudo encontrar.)
                        #(setColor #(getVar redDark | colors))
                    )
                )
            )
        )
    `
}