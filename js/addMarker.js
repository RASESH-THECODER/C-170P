AFRAME .registerComponent("create-markers",{
    init:async function(){
        var mainScene=document.querySelector("#main-scene");
        var dishes=await this.getDishes();
        dishes.map(dish=>{
            var marker=document.createElement("a-marker");
            marker.setAttribute("type","pattern");
            marker.setAttribute("url",dish.marker_pattern_url);
            marker.setAttribute("cursor",{
                rayOrigin:"mouse"
            });
            marker.setAttribute("marker-handler",{})
            mainScene.appendChild(marker)

            var model=document.createElement("a-entity");
            model.setAttribute("id",`model-${dish.id}`);
            model.setAttribute("rotation",dish.model_geometry.rotation);
            model.setAttribute("position",dish.model_geometry.position);
            model.setAttribute("gltf-model",`url(${dish.model_url})` );
            model.setAttribute("gesture-handler",{})
            marker.appendChild(model)

            var mainPlane=document.createElement("a-plane");
            mainPlane.setAttribute("id",`main-plane-${dish.id}`);
            mainPlane.setAttribute("rotation",{x:-90,y:0,z:0});
            mainPlane.setAttribute("position",{x:0,y:0,z:0});
            mainPlane.setAttribute("width",1.7 );
            mainPlane.setAttribute("height",1.5)
            marker.appendChild(mainPlane)

            var titlePlane=document.createElement("a-plane");
            titlePlane.setAttribute("id",`title-plane-${dish.id}`);
            titlePlane.setAttribute("rotation",{x:0,y:0,z:0});
            titlePlane.setAttribute("position",{x:0,y:0.89,z:0.02});
            titlePlane.setAttribute("width",1.67 );
            titlePlane.setAttribute("height",0.3)
            titlePlane.setAttribute("material",{color:"#f0c30f"})
            mainPlane.appendChild(titlePlane)

            var dishTitle=document.createElement("a-entity");
            dishTitle.setAttribute("id",`dish-plane-${dish.id}`);
            dishTitle.setAttribute("rotation",{x:0,y:0,z:0});
            dishTitle.setAttribute("position",{x:0,y:0,z:0.1});
            dishTitle.setAttribute("text",{color:"black",font:"monoid",width:1.8,height:1,align:"center",value:dish.dish_name.toUpperCase()})
            titlePlane.appendChild(dishTitle)

            var ingredients=document.createElement("a-entity");
            ingredients.setAttribute("id",`ingredients-${dish.id}`);
            ingredients.setAttribute("rotation",{x:0,y:0,z:0});
            ingredients.setAttribute("position",{x:0.3,y:0,z:0.1});
            ingredients.setAttribute("text",{color:"black",font:"monoid",width:2,align:"left",value:`${dish.ingredients.join("\n\n")}`})
            mainPlane.appendChild(ingredients)
        })
    },
    getDishes:async function(){
        return await firebase.firestore().collection("dishes").get().then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
    }
})