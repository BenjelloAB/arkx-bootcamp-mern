// let obj = 
// {
//     el: 1,
//     name: "sfdsf",
//     lastName: "benjo",
//     el2: [1,2,3,5],
//     el3: {
//         dead: true,
//         alive: "maybe"
//     },
//     study: function ()
//     {
//         console.log("Studying Hard!");
//         return "nope"
//     }
// }


// console.log(obj["el"]);
// console.log(obj.el3.alive);
// console.log(obj.el3.dead);
// console.log(obj["el2"]);
// console.log(obj["el3"]);
// console.log(obj["study"]())
// console.log(obj.study())


// let obj2 = {
//     title: 'a',
//     play()
//     {
//         console.log(this)
//     }
// }
// function hey()
// {
//     console.log(this);
// }
// hey()
// obj2.play()


// console.log("===============")
// function Employe(name)
// {
//     this.name = name;
//     console.log(this)
//     console.log(this.name);

// }
// const employe_1 = new Employe("Jinro");

console.log("===============")
console.log("")
console.log("")
console.log("")
const special_case = 
{
    el1: 44,
    el2: [1],
    count(){
        this.el2.forEach(function()
        {
            console.log(this); //this we specified which is special_case
            console.log(this.el1);
        }, this)
    }
}
special_case.count();
const special_case2 = 
{
    el1: 44,
    el2: [1],
    count(){
        this.el2.forEach(function()
        {
            console.log(this); //{woho: true}
            console.log(this.el1); // undefined
        }, {woho: true})
    }
}
special_case2.count();


const user = {
    name_user: "Benjo",
    _password: 1234,
    inserted: false,
    insertionApplication(){
        this.inserted = true;
    },
    checkPass: function(pass)
    {
        if(this._password == pass)
            return true;
        return false;
    },
    get password(){
        return this._password;
    },
    set password(newPass){
        this._password = newPass;
    }
}
console.log(user.password)
user.password = 123666;
console.log(user.password)
console.log('problem' > 'aasdjhkasjhd');