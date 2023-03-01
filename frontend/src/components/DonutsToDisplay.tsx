import Product from "./Product"

  const AppleProduct : Product = {
    image:'/apple_krumb.jpg', 
    name:'Apple Krumb', 
    description:'Delicious. Creamy. Irresitable.',
    price : 2.50
  }

  const ChocGlazeProduct : Product = {
    image:'/chocolate_glaze.jpg', 
    name:'Chocolate Glaze', 
    description:'Chocolate Galore',
    price : 2.35
  }

  const BavarianProduct : Product = {
    image:'/bavarian_kreme-1.jpg', 
    name:'Bavarian Kreme', 
    description:'Delicious. Kreamy. Irresitable.',
    price : 4.70
  }

  const BlueberryProduct : Product = {
    image:'/blueberry.jpg',
    name:'Blueberry', 
    description:'Fresh blueberries!',
    price : 2.75
  }

  const KremeProduct : Product = {
    image:'/boston_kreme.jpg', 
    name:'Boston Kreme', 
    description:'Donut made in Pittsburgh not Boston.',
    price : 4.30

  }

  const ChocFrostProduct : Product = {
    image:'/chocolate_frosted.jpg', 
    name:'Chocolate Frosted', 
    description:'Chocolate AND Frosted',
    price : 3.50
  }

  const DonutsToDisplay = [AppleProduct, ChocFrostProduct, ChocGlazeProduct, 
                    BavarianProduct, BlueberryProduct, KremeProduct]

export default DonutsToDisplay