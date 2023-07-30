// 이수과목 리스트
document.addEventListener('DOMContentLoaded', function() {
    const grTable = document.querySelector('.modal-grTable');
    const gsTable = document.querySelector('.modal-gsTable');
    const mrTable = document.querySelector('.modal-mrTable');
    const msTable = document.querySelector('.modal-msTable');

    let mrarr = []; // 전필 데이터 저장할 배열
    let msarr = []; // 전선
    let grarr = []; // 교필
    let gsarr = []; // 교선

    // 데이터 요청
    async function getCreditList() {
        try {
            const response = await fetch('js/creditList.json');
            if (!response.ok) {
                throw new Error('error');
            }
            const creditListData = await response.json();
            return creditListData;
        } catch (error) {
            return null;
        }
    }

    // 받은 데이터 이수구분에 맞게 배열에 추가
    async function addCreditListData() {
        try {
            const CreditListData = await getCreditList();
            CreditListData.forEach(data => {
                if (data.category === '전필') {
                    mrarr.push(data);
                } else if (data.category === '전선') {
                    msarr.push(data);
                } else if (data.category === '교필') {
                    grarr.push(data);
                } else {
                    gsarr.push(data);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // 이수구분에 맞게 테이블에 렌더링
    function renderData(targetArr, targetTable) {
        try {
            const tableContent = targetArr.map(course => `
            <tr>
                <td>${course.category}</td>
                <td>${course.subject}</td>
                <td>${course.score}</td>
                <td>${course.grade}</td>
                <td>${course.year}</td>
                <td>${course.semester}</td>
            </tr>
        `).join('');

            targetTable.insertAdjacentHTML('beforeend', tableContent);
        } catch (error) {
            console.log(error);
        }
    }

    async function main() {
        await addCreditListData();
        renderData(mrarr, mrTable);
        renderData(msarr, msTable);
        renderData(grarr, grTable);
        renderData(gsarr, gsTable);
    }
    
    main();
})