// $(window).load(function() {
  function runSalesBanner(slSettings){
    let salesBannerHTML = `
      <div style="width: 100%; display: flex; justify-content: center">
        <div style="max-width: 1200px; width: 100%; display: flex; 
        padding: 40px 20px; background: rgba(${slSettings.bgRgbColor.red}, 
        ${slSettings.bgRgbColor.green}, ${slSettings.bgRgbColor.blue}, ${slSettings.bgRgbColor.alpha})">
          <div style="width: 200px; display: flex; justify-content: center; 
          align-items: center; flex-direction: row; flex-grow: 1;">
            <img style="width: 200px;" src="${slSettings.productInfo.image_url}" />
            <div style="width: 100%; display: flex;justify-content: center; align-items: center; flex-direction: column;">
              <h2 style="font-size: 3rem; margin-bottom: 2.5rem; font-weight: 700; color: rgba(${slSettings.textRgbColor.red}, ${slSettings.textRgbColor.green}, ${slSettings.textRgbColor.blue}, ${slSettings.textRgbColor.alpha})">${slSettings.title}</h2>
              <span style="font-size: 6rem; color: rgba(${slSettings.textRgbColor.red}, ${slSettings.textRgbColor.green}, ${slSettings.textRgbColor.blue}, ${slSettings.textRgbColor.alpha})">${slSettings.discount}% OFF</span>
            </div>
          </div>
        </div>
      </div>`;

      if (slSettings.bannerLocation == "top") {
        $("header").after(salesBannerHTML);
      } else if (slSettings.bannerLocation == "bottom") {
        $("footer").before(salesBannerHTML);
      } else {
        $(".sale-banner-app").prepend(salesBannerHTML);
      }
  }

  $.get( "https://68d04f5df320.ngrok.io/api/banners", function(data) {
    console.log( "success" );
    // console.log(data)
    })
    .done(function(data) {
        console.log('done',data.data[0].bgRgbColor)
        runSalesBanner(data.data[0])
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "finished" );
  });

  console.log('hello salesbanner.js')
// })