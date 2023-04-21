import fs from 'fs';
import matter from 'gray-matter';
import path from 'path'
import { remark } from 'remark';
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(),'posts')
console.log('process.cwd()',process.cwd());
//C:/projects/app_nexts_typescrip_2023
console.log("postsDirectory",postsDirectory)

export function getSortedPostsData(){
  const fileNames = fs.readdirSync(postsDirectory); //동기식Sync, 비동기식async
  console.log("fileNames",fileNames)
  //fileNames["pre-rendering.md","ssg-ssr.md"]
  const allPostsData = fileNames.map(fileName =>{
    const id = fileName.replace(/\.md$/,'');
    // id = 'pre-rendering
    const fullPath = path.join(postsDirectory, fileName);
   //D:\정상철\next\app_nextjs_typescipt_2023\post\pre-rendering.md
   const fileContents = fs.readFileSync(fullPath, 'utf-8'); //파일 내용
   const matterResult = matter(fileContents); // 객체변환'
   console.log("matterResult" , matterResult);
    return{
      id,
      ...(matterResult.data as {date:string,title:string})
    }
  });//allPostsData

  return allPostsData.sort((a,b) =>{
    if(a.date < b.date){
      return 1
    }else{
      return -1
    }
  })
}//getSortPostsData

export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName =>{
    return{
      params:{
        id:fileName.replace(/.\md$/,'') // id='pre-rendering' id='ssg-ssr'
       }
    }
  })
}

export async function getPostData(id:string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  //D:\정상철\next\app_nextjs_typescipt_2023\posts\pre-rendering.md
  const fileContents = fs.readFileSync(fullPath,'utf-8');
  const matterResult = matter(fileContents); //객체변환
  const processContent = await remark()
                                .use(html).process(matterResult.content) ;//remark는 markdown을 html로 변환
  //npm install remark remark-html --save
  const contentHtml = processContent.toString();
  return{
    id,
    contentHtml,
    ...(matterResult.data as {date:string; title:string})
  }
}