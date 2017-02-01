    // 존재하지 않는 페이지에 접근 했을 때, 이런식으로 랜덤한 8가지 GIF 파일을 배경화면으로 하는 404페이지를 띄워준다:
    var totalCount = 8;
    function ChangeIt()
    {
        var num = Math.ceil( Math.random() * totalCount );
        document.body.background = '//media.disquscdn.com/errors/img/'+num+'.gif';
        document.body.style.backgroundRepeat = "repeat";// Background repeat
    }
    window.onload = ChangeIt;