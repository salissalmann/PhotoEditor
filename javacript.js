var Brightness = 100;
var Saturation = 100;
var Inversion = 0;
var Grayscale = 0;
rotatevalue=0;
scaleX = 0;
scaleY = 0;
var Blur=0;
var Sepia=0;

function uploadImage()
{ 
    var file_uploaded = window._protected_reference = document.getElementById("file-input")
    file_uploaded.multiple = "multiple";
    
    file_uploaded.addEventListener('change', function(ev2) 
    {
      if (file_uploaded.files.length) 
      {
          document.getElementById('photo-src').src = URL.createObjectURL(file_uploaded.files[0]);
      }
    
      new Promise(function(resolve) 
      {
          setTimeout(function() 
          {  
             const fileList = file_uploaded.files;
             downloadpicture(fileList[0].name); 
             resolve(); 
          }, 1000);
      }).then(function(){file_uploaded = window._protected_reference = undefined;});
  
    });
    file_uploaded.click();   
}

function downloadpicture(filename)
{
    previewImg = document.querySelector(".preview-img img")
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${Brightness}%) saturate(${Saturation}%) invert(${Inversion}%) grayscale(${Grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotatevalue !== 0) {
        ctx.rotate(rotatevalue * Math.PI / 180);
    }
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

function Properties(target)
{
    var Text = document.getElementById(target).innerText;
   
    if (Text=="Brightness")
    {
        document.getElementById("name").innerText = Text;
        document.getElementById("slider-value").value = Brightness;
        document.getElementById("value").innerText = Brightness + "%";
    }
    else if (Text=="Saturation")
    {
        document.getElementById("name").innerText = Text;
        document.getElementById("slider-value").value = Saturation;
        document.getElementById("value").innerText = Saturation + "%";
    }
    else if (Text=="Inversion")
    {
        document.getElementById("name").innerText = Text;
        document.getElementById("slider-value").value = Inversion;
        document.getElementById("value").innerText = Inversion + "%";
    }
     else if (Text="Grayscale")
     {
        document.getElementById("name").innerText = Text;
        document.getElementById("slider-value").value = Grayscale;
        document.getElementById("value").innerText = Grayscale + "%";
     }
    
}

document.getElementById("slider-value").oninput = function()
{
    var Property = document.getElementById("name").innerText;

    if (Property=="Brightness")
    {
        document.getElementById("value").innerText = Brightness + "%";
        Brightness = document.getElementById("slider-value").value;
    }
    else if (Property=="Saturation")
    {
        document.getElementById("value").innerText = Saturation + "%";
        Saturation = document.getElementById("slider-value").value;
    }
    else if (Property=="Inversion")
    {
        document.getElementById("value").innerText = Inversion + "%";
        Inversion = document.getElementById("slider-value").value;
    }
    else if (Property=="Grayscale")
    {
        document.getElementById("value").innerText = Grayscale + "%";
        Grayscale = document.getElementById("slider-value").value;
        document.getElementById("value-g").innerText = Grayscale + "%";
        document.getElementById("slider-value-g").value = Grayscale;
    
    }
    document.getElementById('photo-src').setAttribute('style',"filter: brightness("+Brightness+"%) saturate("+Saturation+"%) invert("+Inversion+"%) grayscale("+Grayscale+"%) blur("+Blur+"px) sepia("+Sepia+"%);");
    
}

document.getElementById('left').onclick = function()
{
    rotatevalue=rotatevalue-90;
    if(scaleX==-1 && scaleY==-1)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(-1) scaleY(-1)");    
    }
    else if(scaleX==-1 && scaleY==0)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(-1) scaleY(1)");    
    }
    else if(scaleX==0 && scaleY==-1)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(1) scaleY(-1)");    
    }
    else
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg)");
    }
  
}

document.getElementById('right').onclick = function()
{
    rotatevalue=rotatevalue+90;
    if(scaleX==-1 && scaleY==-1)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(-1) scaleY(-1)");    
    }
    else if(scaleX==-1 && scaleY==0)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(-1) scaleY(1)");    
    }
    else if(scaleX==0 && scaleY==-1)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(1) scaleY(-1)");    
    }
    else
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg)");
    }
  
}

document.getElementById('horizontal').onclick = function()
{
    if (scaleX==0)
    {    
        scaleX--;
        document.getElementById('photo-src').setAttribute('style',"transform : rotateZ("+rotatevalue+"deg) scaleX(-1)");
    }
    else if (scaleX==-1)
    {    
        scaleX++;
        document.getElementById('photo-src').setAttribute('style',"transform : rotateZ("+rotatevalue+"deg) scaleX(1)");
    }
}

document.getElementById('vertical').onclick = function()
{
    if (scaleY==0)
    {    
        scaleY--;
        document.getElementById('photo-src').setAttribute('style',"transform : rotateZ("+rotatevalue+"deg) scaleY(-1)");
    }
    else if (scaleY==-1)
    {    
        scaleY++;
        document.getElementById('photo-src').setAttribute('style',"transform : rotateZ("+rotatevalue+"deg) scaleY(1)");
    }
}

document.getElementById("slider-value-g").oninput = function()
{
    document.getElementById("value-g").innerText = Grayscale + "%";
    Grayscale = document.getElementById("slider-value-g").value;
    document.getElementById('photo-src').setAttribute('style',"filter: brightness("+Brightness+"%) saturate("+Saturation+"%) invert("+Inversion+"%) grayscale("+Grayscale+"%) blur("+Blur+"px) sepia("+Sepia+"%);");  
    if (document.getElementById("name").innerText == "Grayscale")
    {
        document.getElementById("value").innerText = Grayscale + "%";
        document.getElementById("slider-value").value = Grayscale;     
    }
}

document.getElementById("slider-value-b").oninput = function()
{
    document.getElementById("value-b").innerText = Blur + "px";
    Blur = document.getElementById("slider-value-b").value;
    Grayscale = Grayscale/100;
    Inversion = Inversion/100;
    document.getElementById('photo-src').setAttribute('style',"filter: brightness("+Brightness+"%) saturate("+Saturation+"%) invert("+Inversion+"%) grayscale("+Grayscale+"%) blur("+Blur+"px) sepia("+Sepia+"%);");
}

document.getElementById("slider-value-r").oninput = function()
{
    document.getElementById("value-r").innerText = rotatevalue + "deg";
    rotatevalue = document.getElementById("slider-value-r").value;
    if(scaleX==-1 && scaleY==-1)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(-1) scaleY(-1)");    
    }
    else if(scaleX==-1 && scaleY==0)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(-1) scaleY(1)");    
    }
    else if(scaleX==0 && scaleY==-1)
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg) scaleX(1) scaleY(-1)");    
    }
    else
    {
        document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg)");
    }
  
}

document.getElementById("slider-value-s").oninput = function()
{
    document.getElementById("value-s").innerText = Sepia + "%";
    Sepia = document.getElementById("slider-value-s").value;
    document.getElementById('photo-src').setAttribute('style',"filter: brightness("+Brightness+"%) saturate("+Saturation+"%) invert("+Inversion+"%) grayscale("+Grayscale+"%) blur("+Blur+"px) sepia("+Sepia+"%);");
}

document.getElementById('reset-filter').onclick = function()
{
    document.getElementById("value").innerText = 100 + "%";
    document.getElementById("slider-value").value = 100;
    Brightness=100;
    Saturation=100;
    Inversion=0;
    Grayscale=0;
    rotatevalue=0;
    Sepia-0;
    Blur=0;
    document.getElementById('photo-src').setAttribute('style',"filter: brightness("+Brightness+"%);");
    document.getElementById('photo-src').setAttribute('style',"filter: saturate("+Saturation+"%);");
    document.getElementById('photo-src').setAttribute('style',"filter: invert("+Inversion+"%);");
    document.getElementById('photo-src').setAttribute('style',"filter: grayscale("+Grayscale+"%);");    
    document.getElementById('photo-src').setAttribute('style',"transform: rotateZ("+rotatevalue+"deg)");
    document.getElementById('photo-src').setAttribute('style',"transform : scaleX(1)");
    document.getElementById('photo-src').setAttribute('style',"transform : scaleY(1)");
    document.getElementById('photo-src').setAttribute('style',"filter: blur(0px);");  
    document.getElementById('photo-src').setAttribute('style',"filter: sepia(0%);");  
    document.getElementById("value-g").innerText = 0 + "%";
    document.getElementById("slider-value-g").value = 0;
    document.getElementById("value-b").innerText = 0 + "px";
    document.getElementById("slider-value-b").value = 0;
    document.getElementById("value-r").innerText = 0 + "deg";
    document.getElementById("slider-value-r").value = 0;
    document.getElementById("value-s").innerText = 0 + "%";
    document.getElementById("slider-value-s").value = 0;
}

