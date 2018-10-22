import { HttpClient } from '@angular/common/http';
import { FakeNewsletter } from './../service/fake-news.class';
import { FakenewsService } from './../service/fakenews.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar, MatTableDataSource,MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { BottomSheetOverviewExampleSheet } from './BottomSheetOverviewExampleSheet';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  url: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private fakenewsService : FakenewsService, 
    private http: HttpClient,private cookie: CookieService, private bottomSheet: MatBottomSheet, public dialog: MatDialog, private sanitizer:DomSanitizer ) { 
    
  }
  clientCookies;
  ngOnInit() {
    var cookies = this.cookie.get("enviado");
    if(cookies != null && cookies.length > 0){
      this.clientCookies = cookies.split("|");
      console.log(this.clientCookies)
    }
  }

  
  tabData = ["Robô", "Fake News", "Compartilhe"];
  selected = 0;
  robotData = [
    {nome: "Coronocop", img: "assets/robo/coronelcop.jpg", currentImg: "assets/robo/coronelcop-hover.jpg" , hoverImg: "assets/robo/coronelcop.jpg",
     desc: "Ideal para para tarefas que precisem de bruteforce, esse robô consegue ser persistente e bruto "},
    {nome: "Eu, Robei", img: "assets/robo/eu-robo.jpg", currentImg: "assets/robo/eu-robeihover.jpg"  , hoverImg: "assets/robo/eu-robo.jpg" , 
    desc: "Esse funciona com o Lazy Fetch quando é dele a responsabilidade, é mais ideal em casos que ele serve como manipulador"},
    {nome: "Impeachappie", img: "assets/robo/impeachappie.jpg", currentImg: "assets/robo/impeachappie-hover.jpg" , hoverImg: "assets/robo/impeachappie.jpg", 
    desc: "Esse tem uma habilidade peculiar, ele consegue mudar as regras do jogo, aquele DB Oracle pode virar um MongolDB a qualquer momento"},
    {nome: "C3P69", img: "assets/robo/cospebot.jpg", currentImg: "assets/robo/cospebot-hover.jpg" , hoverImg:"assets/robo/cospebot.jpg", 
    desc: "Esse é o mais querido de todos, tem uma performance excelente mas ao fator do número de processamento, é possível ficar muito quente e alguns técnicos ate confessam que queima bastante "}];

    hoverInImage(element,index){
      console.log("Index:"+index+" "+element);
      element.src = this.robotData[index].hoverImg;
    }
    hoverOutImage(element,index){
      console.log("Index:"+index+" "+element);
      element.src = this.robotData[index].img;
    }
  selectedRobot;
    chooseAction(robotData){
      this.selectedRobot = robotData;
      console.log("The robot is:"+robotData.nome);
      this.openSnackBar(("Robô "+this.selectedRobot.nome+" selecionado para a tarefa."), "Dispensar" );
      this.selected++;
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }
    dataSource;
    dataSourceSelecao;
    displayedColumns: string[] = ['select', 'titulo', 'origem', 'enviado' ];
    displayedColumnsSelecao: string[] = ['titulo', 'origem' ];
    fakeNewsList : FakeNewsletter[];
    selection = new SelectionModel<FakeNewsletter>(true, []);
    
    getFakeNews(){
      this.fakenewsService.getFakeNews().subscribe(data=>{
         var fkNl = <FakeNewsletter[]> data;
         if(this.clientCookies != null){
        for(let fk of fkNl){
          for(let cookies of this.clientCookies){
            if(fk.id == cookies)
              fk.enviado = true;
          }
        }
      }
        this.fakeNewsList = fkNl;
        console.log(this.fakeNewsList);
        this.dataSource = new MatTableDataSource(this.fakeNewsList);
      });
    }
    onIndexChange(index){
      if(index == 1 && this.dataSource == null){ 
        this.getFakeNews();
        console.log("data:"+this.dataSource);   
        
      }
      this.selected = index;
    }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

      /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  savedFakeNews: FakeNewsletter[];
  fakeNewsChooseAction(){
    if(this.selection.selected.length == 0){
      return ;
    }
    this.savedFakeNews = this.selection.selected;        
    this.dataSourceSelecao = new MatTableDataSource(this.savedFakeNews);
    var encoded = encodeURIComponent((this.selectedRobot != null ? "Olá eu sou o robô "+this.selectedRobot.nome+" e lhe trouxe a seguinte notícia - " : "")+this.savedFakeNews[0].noticiaTexto);
    var text = "whatsapp://send?text="+ encoded;
    this.shareActionUrlName = text;
    console.log("Encoded:"+text);
    this.selected++;
  }
  shareClick(){
    if(this.savedFakeNews == null ){
      return;
    }
    var deletedIndex = this.savedFakeNews[0];
    deletedIndex.enviado = true;
    const index = this.savedFakeNews.indexOf(deletedIndex, 0); 
    console.log(deletedIndex);
    this.addCookie(deletedIndex.id);
    //this.openBottomSheet();
      if (index > -1) {
        this.savedFakeNews.splice(index, 1);
    }
    if(this.savedFakeNews.length == 0){
      //this.selected--;
      return;
    }
    
    this.dataSourceSelecao = new MatTableDataSource(this.savedFakeNews);   
    
  }
  addCookie(cookieV){
    var hasCookie = this.cookie.check("enviado");
    if(hasCookie){
    var text = this.cookie.get("enviado").split("|");
    for(let entry of text){
        if(entry.includes(cookieV))
        return;
    }     
    }
    this.cookie.set("enviado",hasCookie ? this.cookie.get("enviado")+cookieV+"|" : cookieV+"|");
  }
  shareActionUrlName;
  shareActionUrl(){
    var fake = this.savedFakeNews[0].noticiaTexto;
    console.log(fake);
    
  var text = "whatsapp://send?text="+encodeURIComponent((this.selectedRobot != null ? "Olá eu sou o robô "+this.selectedRobot.nome+" e lhe trouxe a seguinte notícia " : "")+fake);
  console.log("Encoded:"+text);
  return text;
  }
  getSafeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.shareActionUrlName);     
}
  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  url: string;
  name: string;
  data: DialogData;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '250px',
      width: '600px',
      data: {url: this.url}
    });

    dialogRef.afterClosed().subscribe(result => {     
      this.url = result;
      console.log('The dialog was closed '+result);
      this.fakenewsService.postFakeNews(result).subscribe(i=>
        this.getFakeNews());
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

};