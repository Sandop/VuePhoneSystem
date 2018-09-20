/*
 * @Author: Sando 
 * @Date: 2018-09-20 15:36:03 
 * @Last Modified by: Sando
 * @Last Modified time: 2018-09-20 16:15:07
 * 
 * 
 * 添加购物车功能
 * 添加到购物车的商品存储在localstorage中以对象方式存储着{id:num}
 * id  为商品id
 * num 为商品数量
 */


 let prodTools = {};

 //存储在localStorage
 let store = window.localStorage;

 //将获取的字符串装换为对象
 let prods = JSON.parse(store.getItem('prods') || '{}');
 //存储形式为 {id:num}

 //商品的新增或者追加方法
 //obj {id:111,num: 12}
 prodTools.addOrUpdata = function (obj){
     //判断产品是否存在
     if ( prods[obj.id] ) {
        prods[obj.id] += obj.num;
     } else {
        prods[obj.id] = obj.num;
     }
     this.saveProds(prods);
 }

 //商品的删除
 prodTools.delete = function (id) { 
    delete prods[id];
    this.saveProds(prods);
  }

  //商品获取
  prodTools.getProds = function (){
      return prods;
  }

  //获取商品总数
  prodTools.getTotalNum = function (){
      let sum = 0;
      for (let id in prods){
          sum += prods[id];
      }
      return sum;
  }


  //存储数据
  prodTools.saveProds = function (prods){
      //使用JSON.stringify装换为对象存储在localstor中
      store.setItem('prods',JSON.stringify(prods));
  }
  export default prodTools;