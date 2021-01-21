# [109-1] Web Programming Final

### § NTU C👀LER
- 專題名稱：(Group 2) NTU C👀LER
- 組長：B06902059 謝宜儒 ([DylanHIJ](github.com/DylanHIJ))
- 組員：B06902029 裴梧鈞 ([jimpei8989](github.com/jimpei8989))、B06902074 柯宏穎 ([KeHongYing](github.com/KeHongYing))
- GitHub 連結：<https://github.com/DylanHIJ/Web2020-Final>
- Deploy 連結：<ntu-cooler.csie.org:29080>
- Demo 影片連結: <https://youtu.be/Ijtwco45hmQ>

### § 這個服務在做什麼

延伸 Hackathon 03 的成果，我們將服務從原本的一個網頁擴展成從學生的登入、完成作業到老師方的註冊課程、創建題目、批改題目等的一條龍服務。此外，我們更 focus 在助教方改作業時的使用者體驗，透過加上 **螢光筆** 的效果讓助教在茫茫字海中找尋關鍵字，以方便快速的評分。

### § 使用／操作方式

使用者部分，可以先自行用 email 註冊，每個帳號有區分成學生端或助教端，不同身份點進去課程的界面會自己變換，也能創建自己的課程，與同學們共組一個課程在上面切磋，自己出題目與大家分享與練習。課程、作業等都支援正常的 CRUD，有時效性的作業會自己在設定的時間開啟或關閉，方便管理。學生回答問題的部分，學生可以自由地切換題目，不像 Cool 據我們所知只能一路順著寫下去，無法回頭，答案部分也都會在每次 submit 後儲存，並在想要第二次作答時自動顯示於題目上，讓你知道上次自己選了或寫了些什麼東西。

成績計算部分，除了簡答題需要助教自己更新分數，其他都會在助教點選 show grade 後統一計算並公佈，重新計分也可以在更新答案後再按一次即可。計分方法比照臺灣大考的規則，多選題採倒扣制，其他則全對才給予分數。


### § 使用之第三方套件、框架、程式碼

- Frontend: React.JS, Material-UI, Apollo-Client
- Backend: Node.JS
- Database: MongoDB
- API Query Language: GraphQL

### § 專題製作心得

**<u>謝宜儒的心得</u>**：在修這門課之間大多只會刻靜態的網頁，接觸到 React.js 才覺得發現新世界，只要定義好 state 就可以讓網頁自己去更新真的方便許多，省下很多不必要的麻煩。不過在一學期裡要從前端學到後端、資料庫時間實在是不太夠，感覺很多東西都只學到皮毛，而實際做 final project 的時候才發現要 handle 的東西比想像中多，也有很多要注意的眉眉角角，尤其是 asychronous 的行為跟平常寫程式時的直覺有蠻大的差異，所以常常遇到一些不知道怎麼 de 的 bug。前端切版也是一大難題，常常 CSS 呈現的結果都會不如預期，也因為時間不夠來不及做到 RWD，以後若有機會希望能開發一個更完整的網站。

**<u>裴梧鈞的心得</u>**：在這次的專題中，我們用到了從學期初的 HTML/CSS、React.JS 到中後半段的 Node.JS、MongoDB 以及最後使用 GraphQL 把資料串起來。把每個部分串起來的時候才更明確的知道各個元件在一個「網路服務」中的定位，也能更加正確的協調前後端及資料庫的角色。

**<u>柯宏穎的心得</u>**：前面寫作業、hackathon 時都已經有個框架讓我們去填寫，這次自己重頭到尾去設計、討論，從無到有做出一個像樣、真的能使用的網路服務，許多問題都是在這過程中遇到才知道的問題。不像平時寫的程式，各個 component、script 的觸發，Asynchronous 的程式執行方式，都讓我們在撰寫與測試過程中吃足了苦頭。這次主要寫後端的 GraphQL ，算是去挑戰自己接觸一個最不熟的套件，強迫自己去學習，到現在駕輕就熟，最重要的是讓我們瞭解團隊開發的流程與溝通的重要性，體驗未來工作時環境與情況。


### § Contribution

| 學號      | 姓名   | GitHub ID  | 工作內容                         |
| --------- | ------ | ---------- | -------------------------------- |
| B06902059 | 謝宜儒 | DylanHIJ   | Frontend, API connection         |
| B06902029 | 裴梧鈞 | jimpei8989 | Frontend, Deploy                 |
| B06902074 | 柯宏穎 | KeHongYing | Backend API design and implement |


### § Deploy

#### Frontend
```bash
cd ntu-cooler
yarn && yarn build && serve -l tcp://0.0.0.0:29080 -s build/
```

#### Backend
```bash
cd backend
yarn && yarn serve
```