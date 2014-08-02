function printInventory(inputs){
  var commodity = loadAllItems();
  var goodsSum = [];
  var subtotal = [];
  for(var i=0; i<commodity.length; i++)
   {
       goodsSum[i] = 0;
   }
  for(var i=0; i<inputs.length; i++)
      {
         for(var j=0;j<commodity.length;j++)
              {
                  if (inputs[i].substring(0,10)===commodity[j].barcode)
                     {
                      if (inputs[i].length>10)
                              {goodsSum[j]=inputs[i].substring(11,inputs[i].length);}
                      else
                              {goodsSum[j]++;}
                     }
              }
       }
  var promotions = loadPromotions();
  var save = [];
  var saveSum = [];
  var total = 0;
  var totalSave = 0;
  for(var i=0; i<commodity.length; i++)
    {
      for(var j=0;j<promotions.length; j++)
        if(promotions[j].type==='BUY_TWO_GET_ONE_FREE')
           {
              var proCodes=promotions[j].barcodes;
              for(var k = 0; k<proCodes.length; k++)
                {
                   if(commodity[i].barcode === proCodes[k])
                      {
                        subtotal[i]=((parseInt(goodsSum[i]/3))*2*(commodity[i].price)
                        +(goodsSum[i]%3)*(commodity[i].price));
                        break;
                      }
                   else
                       {subtotal[i]=commodity[i].price*goodsSum[i];}
                }
               save[i]=(commodity[i].price*goodsSum[i]-subtotal[i]);
               saveSum[i]=parseInt(goodsSum[i]/3);
           }
    }
  var print = '***<没钱赚商店>购物清单***\n';
  for (var i=0; i<goodsSum.length; i++)
    {
       if(goodsSum[i]!=0)
       print +='名称：'+commodity[i].name+'，数量：'+goodsSum[i]+commodity[i].unit+
      '，单价：'+(commodity[i].price).toFixed(2)+'(元)，小计：'+(subtotal[i]).toFixed(2)+'(元)\n';
    }
  print += '----------------------\n';
  print += '挥泪赠送商品：\n';
  for(var i=0; i<save.length; i++)
    {
      if (save[i] != 0)
      print += '名称：'+commodity[i].name+'，数量：'+saveSum[i]+commodity[i].unit+'\n';
      totalSave += save[i];
    }
  print += '----------------------\n';
  for(var i=0; i<subtotal.length; i++)
    { total+=subtotal[i]; }
  print += '总计：'+total.toFixed(2)+'(元)\n';
  print += '节省：'+totalSave.toFixed(2)+'(元)\n'
  print += '**********************';
  console.log(print);
  }
