AFRAME.registerComponent("markerhandler", {
    init: async function() {
this.el.addEventListener("markerFound",()=>{
    this.handlermarkerfound()
});
this.el.addEventListener("markerLost",()=>{
    this.handlermarkerlost()
});
    },

    handlermarkerfound:function(){
var buttondiv=document.getElementById("button-div");
buttondiv.style.display="flex"

var ratingbutton=document.getElementById("rating-button")
var orderbutton=document.getElementById("ordering-button")

ratingbutton.addEventListener("click",function(){
    swal ({
        icon:"warning",
        title:"rate-dish",
        text:"work in progress"
    })
});

orderbutton.addEventListener("click",function(){
    swal ({
        icon:"https://i.imgur.com/4NZ6uLY.jpg",
        title:"thanks for order!",
        text:"our order will be served soon at your table !"
    })
});
    },
    handlermarkerlost:function(){
        var buttondiv=document.getElementById("button-div");
        buttondiv.style.display="none"
    }

})

