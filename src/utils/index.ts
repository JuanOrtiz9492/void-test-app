export const delay = (time = 300)=> { 
  return new Promise((resolve)=>{
    setTimeout(resolve, time)
  })
}