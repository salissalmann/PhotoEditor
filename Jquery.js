var Brightness = 100;
var Saturation = 100;
var Inversion = 0;
var Grayscale = 10;
var rotatevalue=0;
var scaleX = 0;
var scaleY = 0;
Blur=0;
Sepia=0;

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

$(document).ready( function() 
{    
    $("#choose-img").click( function()
    {
        var file_uploaded = window._protected_reference = document.getElementById("file-input");
        file_uploaded.multiple = "multiple";
        
        file_uploaded.addEventListener('change', function(ev2) 
        {
          if (file_uploaded.files.length) 
          {
              $("#photo-src").attr('src', URL.createObjectURL(file_uploaded.files[0]));
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
    });

    function downloadpicture(filename)
    {
        saveImage()   

        var Element = document.createElement("a");
 
        if ( filename==0)
        {    
            Element.href = document.getElementById('photo-src').src.substring(document.getElementById('photo-src').src.lastIndexOf('/')+1);
        }
        else
        {
            Element.href = filename;
        }
        Element.setAttribute("download","file");
        target = document.createElement("button");
        target.className = "save-img";
        target.innerText = "Save Image";
        target.onclick = downloadpicture;
        Element.appendChild(target);
        document.getElementById("row").replaceChild(Element,document.getElementById("row").childNodes[5]);
    };

    $("#brightness").click ( function()
    {
        var id = $(this).attr('id');
        var Text = $('#'+id).text();
        $('#name').text(Text);
        $('#slider-value').val(Brightness);
        $('#value').text(Brightness + "%");
    });
    
    $("#saturation").click ( function()
    {
        var id = $(this).attr('id');
        var Text = $('#'+id).text();
        $('#name').text(Text);
        $('#slider-value').val(Saturation);
        $('#value').text(Saturation + "%");
    });

    $("#inversion").click ( function()
    {
        var id = $(this).attr('id');
        var Text = $('#'+id).text();
        $('#name').text(Text);
        $('#slider-value').val(Inversion);
        $('#value').text(Inversion + "%");
    });

    $("#grayscale").click ( function()
    {
        var id = $(this).attr('id');
        var Text = $('#'+id).text();
        $('#name').text(Text);
        $('#slider-value').val(Grayscale);
        $('#value').text(Grayscale + "%");
        $('#slider-value-g').val(Grayscale);
        $('#value-g').text(Grayscale + "%");
    });
    
    $("#slider-value").on('input', function()
    {
        var Property = $("#name").text();
        if (Property=="Brightness")
        {
            $("#value").text(Brightness+"%");
            Brightness = $("#slider-value").val();
            $('#photo-src').css( "filter","brightness("+Brightness+"%)" );
        }
        else if (Property=="Saturation")
        {
            $("#value").text(Saturation+"%");
            Saturation = $("#slider-value").val();
            $('#photo-src').css( "filter","saturate("+Saturation+"%)" );
        }
        else if (Property=="Inversion")
        {
            $("#value").text(Inversion+"%");
            Inversion = $("#slider-value").val();
            $('#photo-src').css( "filter","invert("+Inversion+"%)" );
        }
        else if (Property="Grayscale")
        {
            $("#value").text(Grayscale+"%");
            Grayscale = $("#slider-value").val();
            $('#photo-src').css( "filter","grayscale("+Grayscale+"%)" );
            $('#slider-value-g').val(Grayscale);
            $('#value-g').text(Grayscale + "%");  
        }
        $('#photo-src').css( "filter","brightness("+Brightness+"%) saturate("+Saturation+"%) invert("+Inversion+"%) grayscale("+Grayscale+"%);");        
    });

    $('#left').click( function()
    {
        rotatevalue=rotatevalue-90;
        $('#photo-src').css("transform", "rotateZ("+rotatevalue+"deg)");
    });
    
    $('#right').click( function()
    {
        rotatevalue=rotatevalue+90;
        $('#photo-src').css("transform", "rotateZ("+rotatevalue+"deg)");
    });

    $('#horizontal').click( function()
    {
        if (scaleX==0)
        {    
            scaleX--;
            $('#photo-src').css("transform" , "scaleX(-1)");
        }
        else if (scaleX==-1)
        {    
            scaleX++;
            $('#photo-src').css("transform" , "scaleX(1)");
        }
    });
    
    $('#vertical').click( function()
    {
        if (scaleY==0)
        {    
            scaleY--;
            $('#photo-src').css("transform" , "scaleY(-1)");
        }
        else if (scaleY==-1)
        {    
            scaleY++;
            $('#photo-src').css("transform" , "scaleY(1)");
        }
    });

    $("#slider-value-g").on('input', function()
    {
        $("#value-g").text(Grayscale + "%");
        Grayscale = $("#slider-value-g").val();
        $('#photo-src').css("filter" , "grayscale("+Grayscale+"%)");
        $("#value").text(Grayscale + "%");
        $("#slider-value").val(Grayscale);
        
    });
    
    $("#slider-value-b").on('input', function()
    {
        $("#value-b").text(Blur + "px");
        Blur = $("#slider-value-b").val();
        $('#photo-src').css("filter" , "blur("+Blur+"px)");
    });

    $("#slider-value-r").on('input', function()
    {
        $("#value-r").text( rotatevalue + "deg");
        rotatevalue = $("#slider-value-r").val();
        $('#photo-src').css("transform" , "rotateZ("+rotatevalue+"deg");
    });

    $("#slider-value-s").on('input', function()
    {
        $("#value-s").text( Sepia + "%");
        Sepia = $("#slider-value-s").val();
        $('#photo-src').css("filter" , "sepia("+Sepia+"%)");
    });
    
    $('#reset-filter').click( function()
    {
        $("#value").text(100+"%");
        $("#slider-value").val(100);
        Brightness=100;
        Saturation=100;
        Inversion=0;
        Grayscale=0;
        rotatevalue=0;
        Sepia=0;
        Blur=0;
        $('#photo-src').css( "filter","brightness("+Brightness+"%)" );
        $('#photo-src').css( "filter","saturate("+Saturation+"%)" );
        $('#photo-src').css( "filter","invert("+Inversion+"%)" );
        $('#photo-src').css( "filter","grayscale("+Grayscale+"%)" );
        $('#photo-src').css( "filter","blur("+Blur+"px)" );
        $('#photo-src').css( "filter","sepia("+Sepia+"%)" );
        $('#photo-src').css("transform", "rotateZ("+rotatevalue+"deg)");
        $('#photo-src').css("transform" , "scaleX(1)");
        $('#photo-src').css("transform" , "scaleY(1)");
        
        $("#value-g").text(0 + "%");
        $("#slider-value-g").val(0);
        
        $("#value-b").text(0 + "px");
        $("#slider-value-b").val(0);
    
        $("#value-r").text(0 + "deg");
        $("#slider-value-r").val(0);
        
        $("#value-s").text(0 + "%");
        $("#slider-value-s").val(0);       
    });
    
});
