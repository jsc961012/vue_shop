<template>
  <div>
    <el-button @click="point">描点</el-button>
    <el-button @click="getLocation">导航</el-button>
    <div id="map-location" style="width: 1000px;height: 800px">
    </div>
  </div>
</template>
<script>
  import AMap from 'AMap' // 引入高德地图
  export default {
    data() {
      return{
        mapObj: '',
        mylocP: 0,
        mylocO: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.mapObj = new AMap.Map('map-location', {
          //'map-location'是对应页面盒子的id
          resizeEnable: true, //自适应大小
          zoom: 13//初始视窗
        })
      },
      point() {
        // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
        console.log(this.mylocP)
        console.log(this.mylocO)
        let marker = new AMap.Marker({
          map: this.mapObj,
          position: new AMap.LngLat(this.mylocO, this.mylocP) //此处根据页面数据可以直接传入经纬度进行描点
        })
      },
      daohang() {
        AMap.service('AMap.Walking', function() { //回调函数
          var MWalk = new AMap.Walking({
            map: this.mapObj
          }) //造路线导航类
          MWalk.search(['113.27', '23.13'], ['117.65', '24.52'], function(status, result) {})
        })
      },
      getLocation() {
        const self = this
        AMap.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000
          })

          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete(data) {
            // data是具体的定位信息
            console.log('定位成功信息：', data)
          }

          function onError(data) {
            // 定位出错
            console.log('定位失败错误：', data)
            self.getLngLatLocation()
          }
        })
      },
      getLngLatLocation() {
        AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              console.log('通过ip获取当前城市：',result)
              //逆向地理编码
              AMap.plugin('AMap.Geocoder', function() {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: result.adcode
                })

                var lnglat = result.rectangle.split(';')[0].split(',')

                const { data: res } = geocoder.getAddress(lnglat, function(status, data) {
                  if (status === 'complete' && data.info === 'OK') {
                    // result为对应的地理位置详细信息
                    console.log(res)
                  }
                })
                this.mylocO = res.regeocode.addressComponent.businessAreas[0].location.O
                this.mylocP = res.regeocode.addressComponent.businessAreas[0].location.P
                this.point()
              })
            }
          })
        })
      }
    }
  }
</script>
