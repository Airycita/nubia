module.exports = {
    name: "avatar",
    aliases: ['pfp', 'profilepic', 'foto'],
    code: `
    #(set userPhoto | #(replace #(replace #(parseCondition #(argsCount) == 0) | true | #(author avatar)) | false | #(resolveUser #(args) | avatar)))
    #(if #(includes #(get userPhoto) | gif) == false | 
        #(set pngImage | #(replace #(get userPhoto) | webp | png))
        #(set jpgImage | #(replace #(get userPhoto) | webp | jpg))
    |
        #(set pngImage | #(replace #(get userPhoto) | gif | png))
        #(set jpgImage | #(replace #(get userPhoto) | gif | jpg))
    )
    #(set userName | #(replace #(replace #(parseCondition #(argsCount) == 0) | true | #(author name)) | false | #(resolveUser #(args) | name)))
    #(set hasGif | #(includes #(get userPhoto) | gif))
    #(set inverter | #(replace #(replace #(get hasGif) | false | true) | true | false))
    #(if #(get userName) == | 
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
                    #(setTitle Avatar de #(get userName))
                    #(setImage #(get userPhoto)?size=2048)
                    #(setColor #(getVar blueNotSoDark | colors))
                )
                #(newActionRow 
                    #(addButton link | PNG | #(get pngImage) | false)
                    #(addButton link | JPG | #(get jpgImage) | false)
                    #(addButton link | GIF | #(get userPhoto) | #(if #(includes #(get userPhoto) | gif) == true | false | true))
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