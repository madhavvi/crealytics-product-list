export default async function imageCaching(imgArray: any) {
    const promises = await imgArray.map((src: string) => {
        return new Promise(function (resolve, reject) {
          const img = new Image();
  
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
    await Promise.all(promises);
}
