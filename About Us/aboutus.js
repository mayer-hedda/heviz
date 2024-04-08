document.addEventListener('DOMContentLoaded', function () {

    const kvb_img = document.getElementById('kvb-img');
    const kvb_section = document.getElementById('KissVivienBrigitta');

    const mha_img = document.getElementById('mha-img');
    const mha_section = document.getElementById('MayerHeddaAdrienn');

    const szv_img = document.getElementById('szv-img');
    const szv_section = document.getElementById('SzirenyiVivi');

    kvb_img.addEventListener('click', function(){
        kvb_section.scrollIntoView({behavior: 'smooth'});
    });

    mha_img.addEventListener('click', function(){
        mha_section.scrollIntoView({behavior: 'smooth'});
    });

    szv_img.addEventListener('click', function(){
        szv_section.scrollIntoView({behavior: 'smooth'});
    });

})