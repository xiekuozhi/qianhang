const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')
const x =localStorage.getItem('x')
const xObject= JSON.parse(x)
const hashMap= xObject ||[
  {logo:'A',url:'https://www.jirengu.com'},
  {logo:'B',url:'https://www.baidu.com'}] ;

const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')/*在logo下边的显示删除/开头的内容*//*正则表达式*/
}
const render =()=>{
    $siteList.find('li:Not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li =$(`<li>
            <div class="site">
              <div class="logo">${node.logo}</div>
                 <div class="link">${simplifyUrl(node.url)}</div>
                    <div class='close'>
                    <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                    </svg>
                  </div>
             </div>
        </li>`). insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        }) 
        $li.on('click','.close',(e)=>{
            e.stopPropagation() 
            hashMap.splice(index,1)
            render()
        })
        
    })
}
render()


$('.addButton')
.on('click',()=>{
   let url= window.prompt('请问你要添加的网址是啥')
   if(url.indexOf('http')!==0){
    url ='https://' + url
   }
  hashMap.push({
      logo:simplifyUrl(url)[0].toUpperCase(),
      url: url
    });
    render()
    });

       window.onbeforeunload =()=>{
       const string = JSON.stringify(hashMap)  /*把对象变成字符串*/
       localStorage.setItem('x',string)
       
    }

    $(document).on('keypress',(e)=>{
        const {key}=e
        for(let i=0;i<hashMap.length;i++){
            if(hasMap[i].logo.toLowercase()===key){/*toLowercase小写的意思*/
            window.open(hashMap[i].url)   
            }
         }
    })
