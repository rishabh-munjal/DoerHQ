let video_itr = [1 , 2 , 3 , 4 ,5];
let i = 0;



function ChangeVideo(){

    
    const video = document.getElementById('background-video');
    const source = video.querySelector('source');
    const newVideoSource = `/assets/${video_itr[i]}.mp4`;
    source.setAttribute('src' , newVideoSource);
    video.load();
    i++;

    if(i > 4){
        i = 0;
    }

}
