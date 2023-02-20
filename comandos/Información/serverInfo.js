module.exports = {
    name: "serverinfo",
    aliases: ['svinfo', 'server-info'],
    code: `
        #(set fetcher | #(allGuilds))
        #(set ownerID | #(jsEval d.message.guild.ownerId))
        #(set descripción | #(replace #(replace #(parseCondition #(guild description) ==) | false | #(guild description)) | true | No tiene descripción.))
        #(set banner | #(replace #(replace #(parseCondition #(guild banner) ==) | false | #(guild banner)) | true | undefined))
        #(set verifyLevel | #(replace #(replace #(replace #(replace #(replace #(guild verificationLevel) | 4 | Muy alto: El usuario deberá tener un número telefónico válido y verificado.) | 3 | Alto: El usuario deberá ser miembro del servidor por al menos 10 minutos para poder interactuar.) | 2 | Medio: El usuario debe estar registrado al menos hace 5 minutos en Discord.) | 1 | Bajo: El usuario debe tener un correo verificado.) | 0 | Ninguno: sin restricciones.))
        #(send
            #(newEmbed
                #(setTitle #(guild name))
                #(setThumbnail #(jsEval d.message.guild.iconURL()))
                #(setDescription ***ID del servidor:*** \`#(guild id)\`
                %BR%***Descripción:*** \`#(get descripción)\`
                %BR%***Dueño del servidor:*** \`#(user tag | #(get ownerID))\` - \`#(get ownerID)\`
                %BR%***Creado:*** <t:#(round #(calculate #(guild createdTimestamp)/1000) | 0):F> (<t:#(round #(calculate #(guild createdTimestamp)/1000) | 0):R>)
                %BR%%BR%**Estadísticas**
                %BR%***Cantidad de miembros:*** \`#(guild totalMembersCount)\`
                %BR%***Cantidad de canales:*** \`#(guild channelsCount)\`
                %BR%***Cantidad de roles:*** \`#(guild rolesCount)\`
                %BR%***Nivel de mejoras***: \`#(if #(guild boostLevel) < 1 | Sin mejoras. | Nivel #(guild boostLevel))\`
                %BR%%BR%**Misceláneos**
                %BR%***Nivel de verificación:*** \`#(get verifyLevel)\`
                )
                #(if #(get banner) != undefined |
                    #(setImage #(get banner))
                )
                #(setColor #(getVar blueDark | colors))
            )
        )
    `
}