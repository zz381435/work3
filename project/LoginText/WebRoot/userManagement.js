function btSearch(pageNumber) {
    let userName = $("#userName").val();
    let chrName = $("#chrName").val();
    let mail = $("#mail").val();
    let provinceName = $("#provinceName").val();
    let pageSize = $("#pageSize").val();
    // 因为分页导航功能需要传入 pageNumber 参数。
    if (pageNumber === null) {
        pageNumber = $("#pageNumber").text();
    }
    $.ajax({
        type: "post",
        url: "queryUser.do",
        // 默认依据用户名排序，还需要改进
        data: {
            queryParams: {"userName": userName,"chrName": chrName,"email":mail,"provinceName":provinceName},
            pageParams: {"pageSize":pageSize,"pageNumber":pageNumber,"sort":"userName","sortOrder":"desc"}
        },
        dataType: "json",
        // Ajax 请求成功调用的函数， response 这个位置参数名字可以自己取，
        success: function (response) {
            console.log(response.info);
            let rows = response.rows;
            let total = response.total;
            // 总页数
            let pageCount = Math.ceil(total / pageSize);
            $("#total").text(total);
            $("#pageCount").text(pageCount);
            // 先清空 表格内容
            $("#tbody").empty();
            $.each(rows, function (index, row){
                let s = JSON.stringify(row);
                // 字符串拼接 这方法可以改进
                let str = "<tr data='" + s + "'>";
                str = str + '<td><input type="checkbox" value=' + row.userName + '/></td>';
                str = str + '<td>' + row.userName + '</td>';
                str = str + '<td>' + row.chrName + '</td>';
                str = str + '<td>' + row.email + '</td>';
                str = str + '<td>' + row.provinceName + '</td>';
                str = str + '<td>' + row.cityName + '</td>';
                str = str + '<td><a href="#" class="btnDel" value=' + row.userName + '>删除</a>';
                str = str + '<a href="#" class="btnUpdate">修改</a></td>'
                str = str + '</tr>';
                $("tbody").append(str);
            })
        }
    })
}

function btClear() {
    $("#userName").val("");
    $("#chrName").val("");
    $("#mail").val("");
    $("#provinceName").val("");
}

function btDelete(single) {
    let checkedItems = $('tbody tr input:checkbox:checked')
    let len = checkedItems.length;
    if (len === 0 ){
        alert("至少选择一项！");
    }
    else {
        // 定义数组
        let vals = [];
        checkedItems.each(function (index, item) {
            // 循环将选择复选框的 value 值加入数组中

            // 要用 $(this) 才行 用 checkedItems 每次都是 push 第一个元素
            // 下面两行注释是错误写法
            // console.log(checkedItems.val());
            // vals.push(checkedItems.val());

            console.log($(this).val());
            vals.push($(this).val());
        });

        $.ajax({
            type: "post",
            url: "deleteUser.do",
            // 用逗号拼接数组为字符串
            data: {ids: vals.join(",")},
            dataType: "json",
            // Ajax 请求成功调用的函数 response 这个参数名字可以自己取
            success: function (response) {
                alert(response.info);
                if (response.code === 0) {
                    // 重新加载页面，不使用缓存
                    window.location.reload(true);
                }
            }
        })
    }
}

// 修改或者增加
function userUpdateOrInsert() {
    // 新增用户 或者 修改用户信息的标识符
    let action = $("#action").val();
    let userName = $("#new_userName").val();
    let chrName = $("#new_charName").val();
    let mail = $("#new_email").val();
    let provinceName = $("#new_province").val();
    let city = $("#new_city").val();
    let password = $("#new_password").val();


    $.ajax({
        type: "post",
        url: "updateUser.do",
        data: {
            "action": action,
            "userName": userName,
            "chrName": chrName,
            "email": mail,
            "provinceName": provinceName,
            "city": city,
            "password": password,
        },
        dataType: "json",
        // Ajax 请求成功调用的函数 response 这个参数名字可以自己取
        success: function (response) {
            alert(response.info);
            if (response.code === 0) {
                alert("增加成功")
            }
        }
    })
}


function ckAll() {
    $("input:checkbox").each(function (){
        if (this.checked){
            $(this).attr("checked",false);
        }
        else{
            $(this).attr("checked",true);
        }
    })
}


function tdUpdate() {
    // 修改 action 类型为 update
    $("#action").attr("value","update");
    // btnUpdate 绑定点击事件，弹出编辑框 接下来的事件处理交给编辑框的点击事件
    ShowDiv('MyDiv', 'fade');
}

// 弹窗居中没实现，不能获取到弹窗的宽高度。未解决, 通过修改 css 实现了同样的功能
function ShowDiv(show_div, bg_div){
    document.getElementById(show_div).style.display = "block";
    document.getElementById(bg_div).style.display = "block";
}

//关闭 Div 用来关闭 遮罩层 和 弹出层
function CloseDiv(show_div, bg_div){
    document.getElementById(show_div).style.display = "none";
    document.getElementById(bg_div).style.display = "none";
}

$(document).ready(function (){
// 事件处理
    // 工具栏中的操作点击事件绑定
    $("#btSearch").click(function (){
        btSearch();
    });

    $("#btClear").click(function (){
        btClear();
    });

    // 增加和更新的后端操作类似 用一个隐藏 input 标签的 value 属性区别两个操作
    // 增加一个新用户
    $("#btAdd").click(function (){
        // 修改 action 类型为 insert，接下来的由后端处理
        $("#action").attr("value","insert");
        ShowDiv('MyDiv', 'fade');
    });

    // 修改或者新增用户信息弹窗的确认事件处理
    $("#confirmBtn").click(function (){
        userUpdateOrInsert();
    })

    // 一次删除多个用户数据
    $("#btDelete").click(function (){
        btDelete();
    });


    // 表格操作
    // 表格全选按钮
    $("#ckAll").click(function (){
        ckAll();
    });

    // 删除用户
    $(".tdDel").click(function (){
        btDelete();
    });

    // 用户信息更新
    $(".tdUpdate").click(function (){
        // 修改 action 类型为 update
        $("#action").attr("value","update");
        // btnUpdate 绑定点击事件，弹出编辑框 接下来的事件处理交给编辑框的点击事件
        ShowDiv('MyDiv', 'fade');
    });

    // 底部页面导航
    // 首页
    $("#first").click(function (){
        let currentPageNumber = parseInt($("#pageNumber").text());
        if (currentPageNumber === 1 ){
            alert("已经是第一页")
            return ;
        }
        let pageNumber = 1;
        btSearch(pageNumber);
    });

    // 上一页
    $("#back").click(function (){
        let currentPageNumber = parseInt($("#pageNumber").text());
        if (currentPageNumber === 1){
            alert("已经是第一页")
            return ;
        }
        let pageNumber = parseInt($("#pageNumber").text()) - 1;
        btSearch(pageNumber);
    });

    // 下一页
    $("#next").click(function (){
        let total = parseInt($("#total").text());
        let pageSize = parseInt($("#pageSize").val());
        let pageNumber =parseInt(total/pageSize + 1);
        let currentPageNumber = parseInt($("#pageNumber").text());
        if (currentPageNumber === pageNumber){
            alert("已经是最后一页");
            return ;
        }
        pageNumber = parseInt($("#pageNumber").text()) + 1;

        btSearch(pageNumber);
    });

    //  尾页
    $("#last").click(function (){
        let total = parseInt($("#total").text());
        let pageSize = parseInt($("#pageSize").val());
        let pageNumber =parseInt(total/pageSize + 1);
        let currentPageNumber = parseInt($("#pageNumber").text());
        if (currentPageNumber === pageNumber){
            alert("已经是最后一页");
            return ;
        }
        btSearch(pageNumber);
    });


// CSS 属性
    // 鼠标悬停改变背景色
    $("tbody")
        .on("mouseover","tr",function(){
            $(this).addClass('tr_hover');
        })
        .on("mouseout","tr",function(){
            $(this).removeClass('tr_hover');
        });
    // checkbox 表格中被选中行颜色改变
    $("tbody td input:checkbox").click(
        function (){
            if (this.checked === true){
                $(this).parents("tr").addClass("tr_selected");
            }
            else {
                $(this).parents("tr").removeClass("tr_selected");
            }
        }
    );
    // 单双行颜色循环变化
    $("tbody tr:even").addClass("tr_even");
    $("tbody tr:odd").addClass("tr_odd");
})