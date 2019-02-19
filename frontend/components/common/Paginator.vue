<template lang="jade">
    div.paginator(v-if="total>size")
        a.iconfont.icon-two-left-arrow1(v-bind:class="['pageA',currentPage==1?'disable':'']" v-on:click="changePage(1)")

        a.iconfont.icon-left-arrow(v-bind:class="['pageA',currentPage==1?'disable':'']" v-on:click="changePage(currentPage-1)")

        a(v-for="page of showList" v-bind:class="['pageA',currentPage==page?'active':'']" v-on:click="changePage(page)") {{page}}

        a.iconfont.icon-right-arrow(v-bind:class="['pageA',currentPage==totalPage?'disable':'']" v-on:click="changePage(currentPage+1)")

        a.iconfont.icon-two-right-arrow1(v-bind:class="['pageA',currentPage==totalPage?'disable':'']" v-on:click="changePage(totalPage)")
</template>

<script>
/**
 * Created by caolinjian
 * Zenzet
 * 16/07/26.
 * 示例 <Paginator v-bind:current-page.sync="page" v-bind:total="total" v-bind:size="5" v-bind:show-page-a="5"> </Paginator>
 * 双向绑定父级 page(当前页面)  单向绑定total(列表length) size(每页多少个 一般写死即可) showPageA(最多显示多少个页面按钮，写死)
 * 父级中watch page变化加载新页面
 */
export default {
    props: {
        size: {
            type: Number,
            default: 5
        },
        currentPage: {
            type: Number,
            default: 1
        },
        showPageA: {
            type: Number,
            default: 5
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {}
    },
    computed: {
        totalPage() {
            return Math.floor((this.total - 1) / this.size) + 1;
        },
        showList() {
            let showList = [];
            let totalPage = this.totalPage;
            let showPageA = this.showPageA;
            let currentPage = this.currentPage;
            if (totalPage <= showPageA || currentPage < Math.floor(showPageA / 2) + 1) {
                for (var i = 1; i <= totalPage && showList.length <= showPageA - 1; i++) {
                    showList.push(i)
                }
            } else if (currentPage > totalPage - Math.ceil(showPageA / 2)) {
                for (var i = totalPage; showList.length <= showPageA - 1; i--) {
                    showList.unshift(i)
                }
            } else {
                for (var i = currentPage - Math.floor(showPageA / 2); i <= currentPage + Math.ceil(showPageA / 2) - 1 && showList.length <= showPageA - 1; i++) {
                    showList.push(i)
                }
            }
            return showList
        }
    },
    methods: {
        changePage(page) {
            if(page<=this.totalPage&&page>=1){
                this.currentPage = page;
            }
        }
    },
    components: {}
}
</script>

<style lang="scss">
    $page_width: 25px;
    $page_height: 25px;

.paginator {
    position: absolute;
    left:0;
    right:0;
    bottom:20px;
    margin: auto;
    font-size: 0;
    text-align: center;
    .pageA {
        display: inline-block;
        font-size: 14px;
        color: #9E9E9E;
        text-align: center;
        height: $page_height;
        line-height: $page_height - 2;
        width: $page_width;
        cursor: pointer;
        background: #FFFFFF;
        border: 1px solid #9E9E9E;
        border-radius: $page_width;
        margin: 0 5px;
        vertical-align: bottom;
        transition: all 0.3s ease-in-out;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:hover{
            color:#6EBCFF;
            border: 1px solid #6EBCFF;
        }
   }
   .disable{
       color:#ccc !important;
       border: 1px solid #ccc !important;
       cursor: not-allowed !important;
   }
   .active{
       color:#fff;
       background: #6EBCFF;
       border: 1px solid #6EBCFF;
       &:hover{
           color:#fff;
           background: #6EBCFF;
           border: 1px solid #6EBCFF;
       }
    }
    .iconfont {
        line-height: $page_height - 2;
        font-size: 12px;
    }
}

</style>
