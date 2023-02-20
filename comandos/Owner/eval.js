module.exports = {
    name: "eval",
    aliases: ['e', 'ev'],
    code: `
    #(if #(author id) == 853127391585370112 |
        #(eval #(args all))
    )
    `
}