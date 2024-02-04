// // 미수강 과목
// document.addEventListener('DOMContentLoaded', function() {
//     const mrBtn = document.getElementById('majorRequirementsbtn'); // 전공필수 btn
//     const msBtn = document.getElementById('majorSelectbtn'); // 전공선택 btn
//     const grBtn = document.getElementById('generalrequirementsbtn'); // 교양필수 btn
//     const addbody = document.querySelector('.addbody'); // 데이터 추가할 테이블 tbody
//     const paginationContainer = document.querySelector('.pagination'); // 페이지네이션 
//     const clickbtn = document.querySelectorAll('.clickbtn'); // 활성화된 btn style

//     let mrarr = []; // 전필 데이터 저장할 배열
//     let msarr = []; // 전선 
//     let grarr = []; // 교필

//     const itemsPerPage = 4;
//     let currentPage = 1;
//     let activeBtn = 'mrBtn';

//     function handleButtonClick(event) {
//         // 버튼 상태 변경
//         if (event.target.id === 'majorRequirementsbtn') { // 전필 버튼이면
//             activeBtn = 'mrBtn'; // 활성화버튼 - 전필버튼으로 변경
//         } else if (event.target.id === 'majorSelectbtn') {
//             activeBtn = 'msBtn';
//         } else if (event.target.id === 'generalrequirementsbtn') {
//             activeBtn = 'grBtn';
//         }

//         // 활성화 버튼 style
//         mrBtn.classList.toggle('clickbtn', activeBtn === 'mrBtn');
//         msBtn.classList.toggle('clickbtn', activeBtn === 'msBtn');
//         grBtn.classList.toggle('clickbtn', activeBtn === 'grBtn');

//         currentPage = 1;
//         renderData(getCurrentDataArray(), currentPage);
//     }

//     // btn 클릭 시 ~
//     mrBtn.addEventListener('click', handleButtonClick);
//     msBtn.addEventListener('click', handleButtonClick);
//     grBtn.addEventListener('click', handleButtonClick);

// //    fetch('/static/js/uncompletedCourses.json')
//     fetch('/ge_not_list/')
//         .then(function(response) {
//             if (!response.ok) {
//                 throw new Error('error');
//             }
//             return response.json();
//         })
//         .then(function(courses) {
//             courses.forEach(function(course) {
//                 if (course.category === '전필') {
//                     mrarr.push(course);
//                 } else if (course.category === '전선') {
//                     msarr.push(course);
//                 } else {
//                     grarr.push(course);
//                 }
//             });

//             // 초기 렌더링
//             renderData(mrarr, currentPage);
//         })
//         .catch(function(error) {
//             console.error(error);
//         });

//     function renderData(dataArr, page) {
//         mrBtn.classList.toggle('clickbtn', activeBtn === 'mrBtn'); // 초기 전필 btn 활성화

//         // 데이터를 페이지 단위로 분할
//         const startIndex = (page - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         const pageData = dataArr.slice(startIndex, endIndex);

//         // 테이블 내용 업데이트
//         addbody.innerHTML = pageData.map(course => `
//             <tr>
//                 <td>${course.category}</td>
//                 <td>${course.subject}</td>
//                 <td>${course.score}</td>
//             </tr>
//         `).join('');

//         // 페이지네이션 생성
//         createPagination(dataArr.length);
//     }

//     function createPagination(totalItems) {
//         paginationContainer.innerHTML = '';

//         const totalPages = Math.ceil(totalItems / itemsPerPage);

//         for (let i = 1; i <= totalPages; i++) {
//             const page = document.createElement('span');
//             page.textContent = i;
//             page.classList.add('page');
//             if (i === currentPage) {
//                 page.classList.add('active');
//             }

//             // 페이지 번호를 클릭하면 해당 페이지로 이동
//             page.addEventListener('click', function() {
//                 currentPage = i;
//                 renderData(getCurrentDataArray(), currentPage);
//             });

//             paginationContainer.appendChild(page);
//         }
//     }

//     function getCurrentDataArray() {
//         if (activeBtn === 'mrBtn') {
//             return mrarr;
//         } else if (activeBtn === 'msBtn') {
//             return msarr;
//         } else {
//             return grarr;
//         }
//     }
// });








// 미수강 과목
document.addEventListener('DOMContentLoaded', function() {
    const mrBtn = document.getElementById('majorRequirementsbtn'); // 전공필수 btn
    const msBtn = document.getElementById('majorSelectbtn'); // 전공선택 btn
    const grBtn = document.getElementById('generalrequirementsbtn'); // 교양필수 btn
    const addbody = document.querySelector('.addbody'); // 데이터 추가할 테이블 tbody
    const paginationContainer = document.querySelector('.pagination'); // 페이지네이션 
    const clickbtn = document.querySelectorAll('.clickbtn'); // 활성화된 btn style

    let mrarr = []; // 전필 데이터 저장할 배열
    let msarr = []; // 전선 
    let grarr = []; // 교필

    const itemsPerPage = 4;
    let currentPage = 1;
    let activeBtn = 'mrBtn';

    function handleButtonClick(event) {
        // 버튼 상태 변경
        if (event.target.id === 'majorRequirementsbtn') { // 전필 버튼이면
            activeBtn = 'mrBtn'; // 활성화버튼 - 전필버튼으로 변경
        } else if (event.target.id === 'majorSelectbtn') {
            activeBtn = 'msBtn';
        } else if (event.target.id === 'generalrequirementsbtn') {
            activeBtn = 'grBtn';
        }

        // 활성화 버튼 style
        mrBtn.classList.toggle('clickbtn', activeBtn === 'mrBtn');
        msBtn.classList.toggle('clickbtn', activeBtn === 'msBtn');
        grBtn.classList.toggle('clickbtn', activeBtn === 'grBtn');

        currentPage = 1;
        renderData(getCurrentDataArray(), currentPage);
    }

    // btn 클릭 시 ~
    mrBtn.addEventListener('click', handleButtonClick);
    msBtn.addEventListener('click', handleButtonClick);
    grBtn.addEventListener('click', handleButtonClick);


    fetch('/major_req_not_list/') // mrarr 데이터를 /major_req_not_list/에서 받아옴
        .then(function(response) {
            if (!response.ok) {
                throw new Error('error');
            }
            return response.json();
        })
        .then(function(courses) {
            courses.forEach(function(course) {
                mrarr.push(course);
            });
            renderData(mrarr, currentPage);
        })
        .catch(function(error) {
            console.error(error);
        });

    fetch('/major_sub_not_list/') // msarr 데이터를 /major_sub_not_list/에서 받아옴
        .then(function(response) {
            if (!response.ok) {
                throw new Error('error');
            }
            return response.json();
        })
        .then(function(courses) {
            courses.forEach(function(course) {
                msarr.push(course);
            });
            // 초기 렌더링
            renderData(mrarr, currentPage);
        })
        .catch(function(error) {
            console.error(error);
        });

    fetch('/ge_not_list/') // grarr 데이터를 /ge_not_list/에서 받아옴
        .then(function(response) {
            if (!response.ok) {
                throw new Error('error');
            }
            return response.json();
        })
        .then(function(courses) {
            courses.forEach(function(course) {
                grarr.push(course);
            });
            // 초기 렌더링
            renderData(mrarr, currentPage);
        })
        .catch(function(error) {
            console.error(error);
        });

    function renderData(dataArr, page) {
        mrBtn.classList.toggle('clickbtn', activeBtn === 'mrBtn'); // 초기 전필 btn 활성화

        // 데이터를 페이지 단위로 분할
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = dataArr.slice(startIndex, endIndex);

        // 테이블 내용 업데이트
        addbody.innerHTML = pageData.map(course => `
            <tr>
                <td>${course.category}</td>
                <td>${course.subject}</td>
                <td>${course.score}</td>
            </tr>
        `).join('');


        // 페이지네이션 생성
        createPagination(dataArr.length);
    }

    function createPagination(totalItems) {
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        // 현재 페이지가 4 이상일 때만 화살표로 이동할 수 있도록 변수 설정
        const showArrows = totalPages >= 4

        // 왼쪽 화살표 생성 및 이벤트 핸들러 설정
        if (showArrows) {
            const leftArrow = document.createElement('span');
            leftArrow.innerHTML = '<i class="bi bi-chevron-left"></i>';
            leftArrow.classList.add('page');
            leftArrow.classList.add('arrow');
            leftArrow.addEventListener('click', function() {
                currentPage -= 1;
                renderData(getCurrentDataArray(), currentPage);
                createPagination(totalItems);
            });
            paginationContainer.appendChild(leftArrow);

            if (currentPage == 1) {
                leftArrow.style.display = 'none'
            }
        }

        for (let i = 1; i <= totalPages; i++) {
            const page = document.createElement('span');
            page.textContent = i;
            page.classList.add('page');
            if (i === currentPage) {
                page.classList.add('active');
            }

            // 페이지 번호를 클릭하면 해당 페이지로 이동
            page.addEventListener('click', function() {
                currentPage = i;
                renderData(getCurrentDataArray(), currentPage);
            });

            paginationContainer.appendChild(page);

            if (showArrows) {
                // 현재 페이지가 4 이하일 때는 항상 1, 2, 3, 4만 표시
                if (currentPage < 4 && i <= 4) {
                    page.style.display = 'inline';
                } else if (showArrows && i >= currentPage - 2 && i <= currentPage + 1) {
                    page.style.display = 'inline';
                } else if (currentPage > totalPages - 2 && i > totalPages - 2) {
                    page.style.display = 'inline';
                } else {
                    page.style.display = 'none';
                }
            }
        }

        // 오른쪽 화살표 생성 및 이벤트 핸들러 설정
        if (showArrows) {
            if (totalPages === currentPage) { // 현재 페이지가 마지막 페이지면
                rightArrow.style.display = 'none' // 오른쪽 화살표 제거

            }
            const rightArrow = document.createElement('span');
            rightArrow.innerHTML = '<i class="bi bi-chevron-right"></i>';
            rightArrow.classList.add('page');
            rightArrow.classList.add('arrow');
            rightArrow.addEventListener('click', function() {
                currentPage += 1;
                renderData(getCurrentDataArray(), currentPage);
                createPagination(totalItems);
            });
            paginationContainer.appendChild(rightArrow);
        }
    }

    function getCurrentDataArray() {
        if (activeBtn === 'mrBtn') {
            return mrarr;
        } else if (activeBtn === 'msBtn') {
            return msarr;
        } else {
            return grarr;
        }
    }

});