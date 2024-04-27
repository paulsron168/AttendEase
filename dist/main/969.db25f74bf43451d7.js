"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[969],{969:(oe,U,c)=>{c.d(U,{D1:()=>w,ZC:()=>L,fU:()=>v,rJ:()=>re,u6:()=>l,z_:()=>D});var i=c(4438),W=c(177),o=c(4412),K=c(1985),_=c(1413),M=c(4572),G=c(5558),p=c(6697),m=c(6354),r=c(6977);const b=["*"];class d{_clearListeners(){for(const u of this._listeners)u.remove();this._listeners=[]}constructor(u){this._ngZone=u,this._pending=[],this._listeners=[],this._targetStream=new o.t(void 0)}getLazyEmitter(u){return this._targetStream.pipe((0,G.n)(e=>{const t=new K.c(n=>{if(!e)return void this._pending.push({observable:t,observer:n});const a=e.addListener(u,h=>{this._ngZone.run(()=>n.next(h))});if(a)return this._listeners.push(a),()=>a.remove();n.complete()});return t}))}setTarget(u){const e=this._targetStream.value;u!==e&&(e&&(this._clearListeners(),this._pending=[]),this._targetStream.next(u),this._pending.forEach(t=>t.observable.subscribe(t.observer)),this._pending=[])}destroy(){this._clearListeners(),this._pending=[],this._targetStream.complete()}}const z={center:{lat:37.421995,lng:-122.084092},zoom:17,mapTypeId:"roadmap"},I="500px",C="500px";let l=(()=>{class s{set center(e){this._center=e}set zoom(e){this._zoom=e}set options(e){this._options=e||z}constructor(e,t,n){if(this._elementRef=e,this._ngZone=t,this._eventManager=new d((0,i.WQX)(i.SKi)),this.height=I,this.width=C,this._options=z,this.mapInitialized=new i.bkB,this.authFailure=new i.bkB,this.boundsChanged=this._eventManager.getLazyEmitter("bounds_changed"),this.centerChanged=this._eventManager.getLazyEmitter("center_changed"),this.mapClick=this._eventManager.getLazyEmitter("click"),this.mapDblclick=this._eventManager.getLazyEmitter("dblclick"),this.mapDrag=this._eventManager.getLazyEmitter("drag"),this.mapDragend=this._eventManager.getLazyEmitter("dragend"),this.mapDragstart=this._eventManager.getLazyEmitter("dragstart"),this.headingChanged=this._eventManager.getLazyEmitter("heading_changed"),this.idle=this._eventManager.getLazyEmitter("idle"),this.maptypeidChanged=this._eventManager.getLazyEmitter("maptypeid_changed"),this.mapMousemove=this._eventManager.getLazyEmitter("mousemove"),this.mapMouseout=this._eventManager.getLazyEmitter("mouseout"),this.mapMouseover=this._eventManager.getLazyEmitter("mouseover"),this.projectionChanged=this._eventManager.getLazyEmitter("projection_changed"),this.mapRightclick=this._eventManager.getLazyEmitter("rightclick"),this.tilesloaded=this._eventManager.getLazyEmitter("tilesloaded"),this.tiltChanged=this._eventManager.getLazyEmitter("tilt_changed"),this.zoomChanged=this._eventManager.getLazyEmitter("zoom_changed"),this._isBrowser=(0,W.UE)(n),this._isBrowser){const a=window;this._existingAuthFailureCallback=a.gm_authFailure,a.gm_authFailure=()=>{this._existingAuthFailureCallback&&this._existingAuthFailureCallback(),this.authFailure.emit()}}}ngOnChanges(e){(e.height||e.width)&&this._setSize();const t=this.googleMap;t&&(e.options&&t.setOptions(this._combineOptions()),e.center&&this._center&&t.setCenter(this._center),e.zoom&&null!=this._zoom&&t.setZoom(this._zoom),e.mapTypeId&&this.mapTypeId&&t.setMapTypeId(this.mapTypeId))}ngOnInit(){this._isBrowser&&(this._mapEl=this._elementRef.nativeElement.querySelector(".map-container"),this._setSize(),google.maps.Map?this._initialize(google.maps.Map):this._ngZone.runOutsideAngular(()=>{google.maps.importLibrary("maps").then(e=>this._initialize(e.Map))}))}_initialize(e){this._ngZone.runOutsideAngular(()=>{this.googleMap=new e(this._mapEl,this._combineOptions()),this._eventManager.setTarget(this.googleMap),this.mapInitialized.emit(this.googleMap)})}ngOnDestroy(){this.mapInitialized.complete(),this._eventManager.destroy(),this._isBrowser&&(window.gm_authFailure=this._existingAuthFailureCallback)}fitBounds(e,t){this._assertInitialized(),this.googleMap.fitBounds(e,t)}panBy(e,t){this._assertInitialized(),this.googleMap.panBy(e,t)}panTo(e){this._assertInitialized(),this.googleMap.panTo(e)}panToBounds(e,t){this._assertInitialized(),this.googleMap.panToBounds(e,t)}getBounds(){return this._assertInitialized(),this.googleMap.getBounds()||null}getCenter(){return this._assertInitialized(),this.googleMap.getCenter()}getClickableIcons(){return this._assertInitialized(),this.googleMap.getClickableIcons()}getHeading(){return this._assertInitialized(),this.googleMap.getHeading()}getMapTypeId(){return this._assertInitialized(),this.googleMap.getMapTypeId()}getProjection(){return this._assertInitialized(),this.googleMap.getProjection()||null}getStreetView(){return this._assertInitialized(),this.googleMap.getStreetView()}getTilt(){return this._assertInitialized(),this.googleMap.getTilt()}getZoom(){return this._assertInitialized(),this.googleMap.getZoom()}get controls(){return this._assertInitialized(),this.googleMap.controls}get data(){return this._assertInitialized(),this.googleMap.data}get mapTypes(){return this._assertInitialized(),this.googleMap.mapTypes}get overlayMapTypes(){return this._assertInitialized(),this.googleMap.overlayMapTypes}_resolveMap(){return this.googleMap?Promise.resolve(this.googleMap):this.mapInitialized.pipe((0,p.s)(1)).toPromise()}_setSize(){if(this._mapEl){const e=this._mapEl.style;e.height=null===this.height?"":k(this.height)||I,e.width=null===this.width?"":k(this.width)||C}}_combineOptions(){const e=this._options||{};return{...e,center:this._center||e.center||z.center,zoom:this._zoom??e.zoom??z.zoom,mapTypeId:this.mapTypeId||e.mapTypeId||z.mapTypeId,mapId:this.mapId||e.mapId}}_assertInitialized(){}static#e=this.\u0275fac=function(t){return new(t||s)(i.rXU(i.aKT),i.rXU(i.SKi),i.rXU(i.Agw))};static#t=this.\u0275cmp=i.VBU({type:s,selectors:[["google-map"]],inputs:{height:"height",width:"width",mapId:"mapId",mapTypeId:"mapTypeId",center:"center",zoom:"zoom",options:"options"},outputs:{mapInitialized:"mapInitialized",authFailure:"authFailure",boundsChanged:"boundsChanged",centerChanged:"centerChanged",mapClick:"mapClick",mapDblclick:"mapDblclick",mapDrag:"mapDrag",mapDragend:"mapDragend",mapDragstart:"mapDragstart",headingChanged:"headingChanged",idle:"idle",maptypeidChanged:"maptypeidChanged",mapMousemove:"mapMousemove",mapMouseout:"mapMouseout",mapMouseover:"mapMouseover",projectionChanged:"projectionChanged",mapRightclick:"mapRightclick",tilesloaded:"tilesloaded",tiltChanged:"tiltChanged",zoomChanged:"zoomChanged"},exportAs:["googleMap"],standalone:!0,features:[i.OA$,i.aNF],ngContentSelectors:b,decls:2,vars:0,consts:[[1,"map-container"]],template:function(t,n){1&t&&(i.NAR(),i.nrm(0,"div",0),i.SdG(1))},encapsulation:2,changeDetection:0})}return s})();const X=/([A-Za-z%]+)$/;function k(s){return null==s?"":X.test(s)?s:`${s}px`}let w=(()=>{class s{set options(e){this._options.next(e||{})}set position(e){this._position.next(e)}constructor(e,t,n){this._googleMap=e,this._elementRef=t,this._ngZone=n,this._eventManager=new d((0,i.WQX)(i.SKi)),this._options=new o.t({}),this._position=new o.t(void 0),this._destroy=new _.B,this.closeclick=this._eventManager.getLazyEmitter("closeclick"),this.contentChanged=this._eventManager.getLazyEmitter("content_changed"),this.domready=this._eventManager.getLazyEmitter("domready"),this.positionChanged=this._eventManager.getLazyEmitter("position_changed"),this.zindexChanged=this._eventManager.getLazyEmitter("zindex_changed"),this.infoWindowInitialized=new i.bkB}ngOnInit(){this._googleMap._isBrowser&&this._combineOptions().pipe((0,p.s)(1)).subscribe(e=>{google.maps.InfoWindow?this._initialize(google.maps.InfoWindow,e):this._ngZone.runOutsideAngular(()=>{google.maps.importLibrary("maps").then(t=>{this._initialize(t.InfoWindow,e)})})})}_initialize(e,t){this._ngZone.runOutsideAngular(()=>{this.infoWindow=new e(t),this._eventManager.setTarget(this.infoWindow),this.infoWindowInitialized.emit(this.infoWindow),this._watchForOptionsChanges(),this._watchForPositionChanges()})}ngOnDestroy(){this._eventManager.destroy(),this._destroy.next(),this._destroy.complete(),this.infoWindow&&this.close()}close(){this._assertInitialized(),this.infoWindow.close()}getContent(){return this._assertInitialized(),this.infoWindow.getContent()||null}getPosition(){return this._assertInitialized(),this.infoWindow.getPosition()||null}getZIndex(){return this._assertInitialized(),this.infoWindow.getZIndex()}openAdvancedMarkerElement(e,t){this._assertInitialized(),e&&(this.infoWindow.close(),t&&this.infoWindow.setContent(t),this.infoWindow.open(this._googleMap.googleMap,e))}open(e,t){this._assertInitialized();const n=e?e.getAnchor():void 0;(this.infoWindow.get("anchor")!==n||!n)&&(this._elementRef.nativeElement.style.display="",this.infoWindow.open({map:this._googleMap.googleMap,anchor:n,shouldFocus:t}))}_combineOptions(){return(0,M.z)([this._options,this._position]).pipe((0,m.T)(([e,t])=>({...e,position:t||e.position,content:this._elementRef.nativeElement})))}_watchForOptionsChanges(){this._options.pipe((0,r.Q)(this._destroy)).subscribe(e=>{this._assertInitialized(),this.infoWindow.setOptions(e)})}_watchForPositionChanges(){this._position.pipe((0,r.Q)(this._destroy)).subscribe(e=>{e&&(this._assertInitialized(),this.infoWindow.setPosition(e))})}_assertInitialized(){}static#e=this.\u0275fac=function(t){return new(t||s)(i.rXU(l),i.rXU(i.aKT),i.rXU(i.SKi))};static#t=this.\u0275dir=i.FsC({type:s,selectors:[["map-info-window"]],hostAttrs:[2,"display","none"],inputs:{options:"options",position:"position"},outputs:{closeclick:"closeclick",contentChanged:"contentChanged",domready:"domready",positionChanged:"positionChanged",zindexChanged:"zindexChanged",infoWindowInitialized:"infoWindowInitialized"},exportAs:["mapInfoWindow"],standalone:!0})}return s})();const J={position:{lat:37.421995,lng:-122.084092}};let v=(()=>{class s{set title(e){this._title=e}set position(e){this._position=e}set label(e){this._label=e}set clickable(e){this._clickable=e}set options(e){this._options=e}set icon(e){this._icon=e}set visible(e){this._visible=e}constructor(e,t){this._googleMap=e,this._ngZone=t,this._eventManager=new d((0,i.WQX)(i.SKi)),this.animationChanged=this._eventManager.getLazyEmitter("animation_changed"),this.mapClick=this._eventManager.getLazyEmitter("click"),this.clickableChanged=this._eventManager.getLazyEmitter("clickable_changed"),this.cursorChanged=this._eventManager.getLazyEmitter("cursor_changed"),this.mapDblclick=this._eventManager.getLazyEmitter("dblclick"),this.mapDrag=this._eventManager.getLazyEmitter("drag"),this.mapDragend=this._eventManager.getLazyEmitter("dragend"),this.draggableChanged=this._eventManager.getLazyEmitter("draggable_changed"),this.mapDragstart=this._eventManager.getLazyEmitter("dragstart"),this.flatChanged=this._eventManager.getLazyEmitter("flat_changed"),this.iconChanged=this._eventManager.getLazyEmitter("icon_changed"),this.mapMousedown=this._eventManager.getLazyEmitter("mousedown"),this.mapMouseout=this._eventManager.getLazyEmitter("mouseout"),this.mapMouseover=this._eventManager.getLazyEmitter("mouseover"),this.mapMouseup=this._eventManager.getLazyEmitter("mouseup"),this.positionChanged=this._eventManager.getLazyEmitter("position_changed"),this.mapRightclick=this._eventManager.getLazyEmitter("rightclick"),this.shapeChanged=this._eventManager.getLazyEmitter("shape_changed"),this.titleChanged=this._eventManager.getLazyEmitter("title_changed"),this.visibleChanged=this._eventManager.getLazyEmitter("visible_changed"),this.zindexChanged=this._eventManager.getLazyEmitter("zindex_changed"),this.markerInitialized=new i.bkB}ngOnInit(){this._googleMap._isBrowser&&(google.maps.Marker&&this._googleMap.googleMap?this._initialize(this._googleMap.googleMap,google.maps.Marker):this._ngZone.runOutsideAngular(()=>{Promise.all([this._googleMap._resolveMap(),google.maps.importLibrary("marker")]).then(([e,t])=>{this._initialize(e,t.Marker)})}))}_initialize(e,t){this._ngZone.runOutsideAngular(()=>{this.marker=new t(this._combineOptions()),this._assertInitialized(),this.marker.setMap(e),this._eventManager.setTarget(this.marker),this.markerInitialized.next(this.marker)})}ngOnChanges(e){const{marker:t,_title:n,_position:a,_label:h,_clickable:g,_icon:y,_visible:f}=this;t&&(e.options&&t.setOptions(this._combineOptions()),e.title&&void 0!==n&&t.setTitle(n),e.position&&a&&t.setPosition(a),e.label&&void 0!==h&&t.setLabel(h),e.clickable&&void 0!==g&&t.setClickable(g),e.icon&&y&&t.setIcon(y),e.visible&&void 0!==f&&t.setVisible(f))}ngOnDestroy(){this.markerInitialized.complete(),this._eventManager.destroy(),this.marker?.setMap(null)}getAnimation(){return this._assertInitialized(),this.marker.getAnimation()||null}getClickable(){return this._assertInitialized(),this.marker.getClickable()}getCursor(){return this._assertInitialized(),this.marker.getCursor()||null}getDraggable(){return this._assertInitialized(),!!this.marker.getDraggable()}getIcon(){return this._assertInitialized(),this.marker.getIcon()||null}getLabel(){return this._assertInitialized(),this.marker.getLabel()||null}getOpacity(){return this._assertInitialized(),this.marker.getOpacity()||null}getPosition(){return this._assertInitialized(),this.marker.getPosition()||null}getShape(){return this._assertInitialized(),this.marker.getShape()||null}getTitle(){return this._assertInitialized(),this.marker.getTitle()||null}getVisible(){return this._assertInitialized(),this.marker.getVisible()}getZIndex(){return this._assertInitialized(),this.marker.getZIndex()||null}getAnchor(){return this._assertInitialized(),this.marker}_resolveMarker(){return this.marker?Promise.resolve(this.marker):this.markerInitialized.pipe((0,p.s)(1)).toPromise()}_combineOptions(){const e=this._options||J;return{...e,title:this._title||e.title,position:this._position||e.position,label:this._label||e.label,clickable:this._clickable??e.clickable,map:this._googleMap.googleMap,icon:this._icon||e.icon,visible:this._visible??e.visible}}_assertInitialized(){}static#e=this.\u0275fac=function(t){return new(t||s)(i.rXU(l),i.rXU(i.SKi))};static#t=this.\u0275dir=i.FsC({type:s,selectors:[["map-marker"]],inputs:{title:"title",position:"position",label:"label",clickable:"clickable",options:"options",icon:"icon",visible:"visible"},outputs:{animationChanged:"animationChanged",mapClick:"mapClick",clickableChanged:"clickableChanged",cursorChanged:"cursorChanged",mapDblclick:"mapDblclick",mapDrag:"mapDrag",mapDragend:"mapDragend",draggableChanged:"draggableChanged",mapDragstart:"mapDragstart",flatChanged:"flatChanged",iconChanged:"iconChanged",mapMousedown:"mapMousedown",mapMouseout:"mapMouseout",mapMouseover:"mapMouseover",mapMouseup:"mapMouseup",positionChanged:"positionChanged",mapRightclick:"mapRightclick",shapeChanged:"shapeChanged",titleChanged:"titleChanged",visibleChanged:"visibleChanged",zindexChanged:"zindexChanged",markerInitialized:"markerInitialized"},exportAs:["mapMarker"],standalone:!0,features:[i.OA$]})}return s})(),L=(()=>{class s{set options(e){this._options.next(e||{})}set path(e){this._path.next(e)}constructor(e,t){this._map=e,this._ngZone=t,this._eventManager=new d((0,i.WQX)(i.SKi)),this._options=new o.t({}),this._path=new o.t(void 0),this._destroyed=new _.B,this.polylineClick=this._eventManager.getLazyEmitter("click"),this.polylineDblclick=this._eventManager.getLazyEmitter("dblclick"),this.polylineDrag=this._eventManager.getLazyEmitter("drag"),this.polylineDragend=this._eventManager.getLazyEmitter("dragend"),this.polylineDragstart=this._eventManager.getLazyEmitter("dragstart"),this.polylineMousedown=this._eventManager.getLazyEmitter("mousedown"),this.polylineMousemove=this._eventManager.getLazyEmitter("mousemove"),this.polylineMouseout=this._eventManager.getLazyEmitter("mouseout"),this.polylineMouseover=this._eventManager.getLazyEmitter("mouseover"),this.polylineMouseup=this._eventManager.getLazyEmitter("mouseup"),this.polylineRightclick=this._eventManager.getLazyEmitter("rightclick"),this.polylineInitialized=new i.bkB}ngOnInit(){this._map._isBrowser&&this._combineOptions().pipe((0,p.s)(1)).subscribe(e=>{google.maps.Polyline&&this._map.googleMap?this._initialize(this._map.googleMap,google.maps.Polyline,e):this._ngZone.runOutsideAngular(()=>{Promise.all([this._map._resolveMap(),google.maps.importLibrary("maps")]).then(([t,n])=>{this._initialize(t,n.Polyline,e)})})})}_initialize(e,t,n){this._ngZone.runOutsideAngular(()=>{this.polyline=new t(n),this._assertInitialized(),this.polyline.setMap(e),this._eventManager.setTarget(this.polyline),this.polylineInitialized.emit(this.polyline),this._watchForOptionsChanges(),this._watchForPathChanges()})}ngOnDestroy(){this._eventManager.destroy(),this._destroyed.next(),this._destroyed.complete(),this.polyline?.setMap(null)}getDraggable(){return this._assertInitialized(),this.polyline.getDraggable()}getEditable(){return this._assertInitialized(),this.polyline.getEditable()}getPath(){return this._assertInitialized(),this.polyline.getPath()}getVisible(){return this._assertInitialized(),this.polyline.getVisible()}_combineOptions(){return(0,M.z)([this._options,this._path]).pipe((0,m.T)(([e,t])=>({...e,path:t||e.path})))}_watchForOptionsChanges(){this._options.pipe((0,r.Q)(this._destroyed)).subscribe(e=>{this._assertInitialized(),this.polyline.setOptions(e)})}_watchForPathChanges(){this._path.pipe((0,r.Q)(this._destroyed)).subscribe(e=>{e&&(this._assertInitialized(),this.polyline.setPath(e))})}_assertInitialized(){}static#e=this.\u0275fac=function(t){return new(t||s)(i.rXU(l),i.rXU(i.SKi))};static#t=this.\u0275dir=i.FsC({type:s,selectors:[["map-polyline"]],inputs:{options:"options",path:"path"},outputs:{polylineClick:"polylineClick",polylineDblclick:"polylineDblclick",polylineDrag:"polylineDrag",polylineDragend:"polylineDragend",polylineDragstart:"polylineDragstart",polylineMousedown:"polylineMousedown",polylineMousemove:"polylineMousemove",polylineMouseout:"polylineMouseout",polylineMouseover:"polylineMouseover",polylineMouseup:"polylineMouseup",polylineRightclick:"polylineRightclick",polylineInitialized:"polylineInitialized"},exportAs:["mapPolyline"],standalone:!0})}return s})(),D=(()=>{class s{set autoRefresh(e){this._autoRefresh.next(e)}constructor(e,t){this._map=e,this._ngZone=t,this._autoRefresh=new o.t(!0),this._destroyed=new _.B,this.trafficLayerInitialized=new i.bkB}ngOnInit(){this._map._isBrowser&&this._combineOptions().pipe((0,p.s)(1)).subscribe(e=>{google.maps.TrafficLayer&&this._map.googleMap?this._initialize(this._map.googleMap,google.maps.TrafficLayer,e):this._ngZone.runOutsideAngular(()=>{Promise.all([this._map._resolveMap(),google.maps.importLibrary("maps")]).then(([t,n])=>{this._initialize(t,n.TrafficLayer,e)})})})}_initialize(e,t,n){this._ngZone.runOutsideAngular(()=>{this.trafficLayer=new t(n),this._assertInitialized(),this.trafficLayer.setMap(e),this.trafficLayerInitialized.emit(this.trafficLayer),this._watchForAutoRefreshChanges()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.trafficLayer?.setMap(null)}_combineOptions(){return this._autoRefresh.pipe((0,m.T)(e=>({autoRefresh:e})))}_watchForAutoRefreshChanges(){this._combineOptions().pipe((0,r.Q)(this._destroyed)).subscribe(e=>{this._assertInitialized(),this.trafficLayer.setOptions(e)})}_assertInitialized(){if(!this.trafficLayer)throw Error("Cannot interact with a Google Map Traffic Layer before it has been initialized. Please wait for the Traffic Layer to load before trying to interact with it.")}static#e=this.\u0275fac=function(t){return new(t||s)(i.rXU(l),i.rXU(i.SKi))};static#t=this.\u0275dir=i.FsC({type:s,selectors:[["map-traffic-layer"]],inputs:{autoRefresh:"autoRefresh"},outputs:{trafficLayerInitialized:"trafficLayerInitialized"},exportAs:["mapTrafficLayer"],standalone:!0})}return s})(),re=(()=>{class s{static#e=this.\u0275fac=function(t){return new(t||s)};static#t=this.\u0275mod=i.$C({type:s});static#i=this.\u0275inj=i.G2t({})}return s})()}}]);