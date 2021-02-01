
process.on('message', (msg) => {
    console.log(msg)
    heavyLifiting(msg);
})
function heavyLifiting(args) { 
    const c = {};
    for (let i = 0; i < args.length; i++) { 
        if (c[args[i].username]) { 
            c[args[i].username].votes ++; 
        } else { 
            const obj = {
                votes: 1, 
            }
            c[args[i].username] = obj;
        }
    }
    return c;
}
let c = heavyLifiting(test);
console.log(c);