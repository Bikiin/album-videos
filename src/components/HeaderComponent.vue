<template>
  <header>
    <h1>Añadir nuevo video</h1>
    <div>
      <input type="text" name="url" placeholder="Añadir"/>
      <button>Añadir</button>
    </div>
  </header>
</template>

<style scoped>
h1{
  font-size: 28px;
  font-weight: 500;
}
header{
  width: 1076px;
  margin: 50px auto;
}
div{
  display: flex;
}
input{
  width: 76.5%;
  height: 53px;
  border-radius: 5px 0px 0px 5px;
  padding-left: 23px;
  border-right: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
input:focus{
    outline: none;
}
button{
  width: 23.5%;
  height: 57px;
  border-radius: 0px 10px 10px 0px;
  border: none;
  color: white;
  background-color: #136AE4;;
}

@media (max-width: 1090px){
  header{
    width: 90%;
  }
}
</style>