document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('searchResult');
    localStorage.removeItem('Error Code:');

    const kvb_img = document.getElementById('kvb-img');
    const kvb_name = document.getElementById('KissVivien');
    const kvb_section = document.getElementById('KissVivienBrigitta');

    const mha_img = document.getElementById('mha-img');
    const mha_name = document.getElementById('MayerHedda');
    const mha_section = document.getElementById('MayerHeddaAdrienn');

    const szv_img = document.getElementById('szv-img');
    const szv_name = document.getElementById('SzirenyiVivien');
    const szv_section = document.getElementById('SzirenyiVivi');

    kvb_img.addEventListener('click', function () {
        kvb_section.style.scrollMarginTop = '80px';
        kvb_section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    kvb_name.addEventListener('click', function () {
        kvb_section.style.scrollMarginTop = '80px';
        kvb_section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })

    mha_img.addEventListener('click', function () {
        mha_section.style.scrollMarginTop = '40px';
        mha_section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    mha_name.addEventListener('click', function () {
        mha_section.style.scrollMarginTop = '40px';
        mha_section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })

    szv_img.addEventListener('click', function () {
        szv_section.style.scrollMarginTop = '40px';
        szv_section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    szv_name.addEventListener('click', function () {
        szv_section.style.scrollMarginTop = '40px';
        szv_section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })

})