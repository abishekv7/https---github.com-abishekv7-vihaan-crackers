import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import autoTable from 'jspdf-autotable'; // Import autoTable;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../../service/email.service';


export interface Cracker {
  name: string;
  mrp: number;
  price: number;
  qty: number;
  category: string;
  total: number;
}
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number; // Add any additional properties if needed
    };
  }
}

@Component({
  selector: 'app-crackers-home',
  templateUrl: './crackers-home.component.html',
  styleUrl: './crackers-home.component.css'
})
export class CrackersHomeComponent {

  personForm: FormGroup;
  constructor(private fb: FormBuilder, private emailService: EmailService) {
    // Initialize the form
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  displayedColumns: string[] = ['serialNo', 'name', 'price', 'qty', 'totalPrice'];
  crackers: Cracker[] = [
    { name: '2¾" KURUVI - PKT', mrp: 40, price: 12, qty: 0, total: 0, category: 'Single Sound Crackers' },
    { name: '3½" DUCK - PKT', mrp: 75, price: 22.5, qty: 0, total: 0, category: 'Single Sound Crackers' },
    { name: '4" LAKSHMI - 1 PKT', mrp: 100, price: 30, qty: 0, total: 0, category: 'Single Sound Crackers' },
    { name: '4" DELUXE LAKSMI/PANDA - BOX', mrp: 150, price: 45, qty: 0, total: 0, category: 'Single Sound Crackers' },
    { name: '4" GOLD LAKSHMI - 1 PKT', mrp: 180, price: 54, qty: 0, total: 0, category: 'Single Sound Crackers' },
    { name: '5" YANAI 25 PLY - PKT', mrp: 300, price: 90, qty: 0, total: 0, category: 'Single Sound Crackers' },
    { name: '2 SOUND CRACKERS - BOX', mrp: 175, price: 52.5, qty: 0, total: 0, category: 'Single Sound Crackers' },

    // Vadakkampatti Paper Bomb Crackers
    { name: 'MAGIZH BOUNCER COLOUR PAPER BOMP - 1 PC', mrp: 190, price: 57, qty: 0, total: 0, category: 'Vadakkampatti Paper Bomb Crackers' },
    { name: 'PAPER BOMP - 1/4 KG - Pc', mrp: 225, price: 67.5, qty: 0, total: 0, category: 'Vadakkampatti Paper Bomb Crackers' },
    { name: '1/2 KG PAPER BOMP - PC', mrp: 450, price: 135, qty: 0, total: 0, category: 'Vadakkampatti Paper Bomb Crackers' },
    { name: '1 KG PAPER BOMP - PC', mrp: 900, price: 270, qty: 0, total: 0, category: 'Vadakkampatti Paper Bomb Crackers' },
    { name: '24 DIGITAL DELUXE - PKT', mrp: 225, price: 67.5, qty: 0, total: 0, category: 'Vadakkampatti Paper Bomb Crackers' },

    // Bijili Crackers
    { name: 'RED BIJILI - 50 PCS - BAG', mrp: 90, price: 27, qty: 0, total: 0, category: 'Bijili Crackers' },
    { name: 'RED BIJILI - 100 PCS - BAG', mrp: 200, price: 60, qty: 0, total: 0, category: 'Bijili Crackers' },

    // Budget Festival Crackers
    { name: '1K DIGITAL - BUDGET - Box', mrp: 900, price: 270, qty: 0, total: 0, category: 'Budget Festival Crackers' },

    // Special Festival Crackers
    { name: '90 WATTS - 3 PKTS - BOX', mrp: 600, price: 180, qty: 0, total: 0, category: 'Special Festival Crackers' },
    { name: '1K DIGITAL - BOX', mrp: 1300, price: 390, qty: 0, total: 0, category: 'Special Festival Crackers' },
    { name: '2K DIGITAL - BOX', mrp: 2600, price: 780, qty: 0, total: 0, category: 'Special Festival Crackers' },
    { name: '5K DIGITAL - BOX', mrp: 6000, price: 1800, qty: 0, total: 0, category: 'Special Festival Crackers' },
    { name: '10K DIGITAL - BOX', mrp: 13000, price: 3900, qty: 0, total: 0, category: 'Special Festival Crackers' },

    // Flower Pot Crackers
    { name: 'FLOWER POTS BIG - BOX', mrp: 300, price: 90, qty: 0, total: 0, category: 'Flower Pot Crackers' },
    { name: 'FLOWER POTS SPECIAL - BOX', mrp: 475, price: 142.5, qty: 0, total: 0, category: 'Flower Pot Crackers' },
    { name: 'FLOWER POTS ASHOKA - BOX', mrp: 600, price: 180, qty: 0, total: 0, category: 'Flower Pot Crackers' },
    { name: 'FLOWER POTS COLOR KOTI - BOX', mrp: 975, price: 292.5, qty: 0, total: 0, category: 'Flower Pot Crackers' },
    { name: 'FLOWER POTS COLOR KOTI DELUXE - BOX', mrp: 1700, price: 510, qty: 0, total: 0, category: 'Flower Pot Crackers' },
    { name: 'MONSTER POTS - Box', mrp: 2750, price: 825, qty: 0, total: 0, category: 'Flower Pot Crackers' },
    { name: 'COLOR KOTI DELUXE - 5 PCS - Box', mrp: 1000, price: 300, qty: 0, total: 0, category: 'Flower Pot Crackers' },

    // Ground Chakkar Crackers
    { name: 'GROUND CHAKKAR BIG 10 PCS - BOX', mrp: 200, price: 60, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },
    { name: 'GROUND CHAKKAR SPECIAL - BOX', mrp: 400, price: 120, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },
    { name: 'GROUND CHAKKAR DELUXE - BOX', mrp: 650, price: 195, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },
    { name: 'SPINNER SPECIAL - Box', mrp: 700, price: 210, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },
    { name: 'SPINNER DELUXE - Box', mrp: 950, price: 285, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },
    { name: '4X4 WHEEL - Box', mrp: 875, price: 262.5, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },
    { name: 'WIRE CHAKKAR - BOX', mrp: 975, price: 292.5, qty: 0, total: 0, category: 'Ground Chakkar Crackers' },

    // Flash Bomb Crackers
    { name: 'KING OF KING - BOX', mrp: 400, price: 120, qty: 0, total: 0, category: 'Flash Bomb Crackers' },
    { name: 'CLASSIC BOMB - Box', mrp: 500, price: 150, qty: 0, total: 0, category: 'Flash Bomb Crackers' },
    { name: 'DIGITAL FORCE / TRACER BOMP - Box', mrp: 900, price: 270, qty: 0, total: 0, category: 'Flash Bomb Crackers' },
    { name: 'SPECIAL BOMB - Box', mrp: 1750, price: 525, qty: 0, total: 0, category: 'Flash Bomb Crackers' },

    // Sparklers
    { name: '10 CM ELECTRIC SPARKLERS - Box', mrp: 90, price: 27, qty: 0, total: 0, category: 'Sparklers' },
    { name: '10 CM COLOR SPARKLERS - Box', mrp: 100, price: 30, qty: 0, total: 0, category: 'Sparklers' },
    { name: '10 CM GREEN SPARKLERS - Box', mrp: 105, price: 31.5, qty: 0, total: 0, category: 'Sparklers' },
    { name: '7 CM ELECTRIC SPARKLERS - Box', mrp: 120, price: 36, qty: 0, total: 0, category: 'Sparklers' },
    { name: '7 CM GREEN SPARKLERS - Box', mrp: 140, price: 42, qty: 0, total: 0, category: 'Sparklers' },
    { name: 'BIG GREEN SPARKLERS - Box', mrp: 240, price: 72, qty: 0, total: 0, category: 'Sparklers' },
    { name: '12 CM GREEN SPARKLERS - Box', mrp: 280, price: 84, qty: 0, total: 0, category: 'Sparklers' },
    { name: '12 CM RED SPARKLERS - Box', mrp: 185, price: 55.5, qty: 0, total: 0, category: 'Sparklers' },
    { name: '15 CM ELECTRIC SPARKLERS - Box', mrp: 220, price: 66, qty: 0, total: 0, category: 'Sparklers' },
    { name: '15 CM COLOUR SPARKLERS - Box', mrp: 240, price: 72, qty: 0, total: 0, category: 'Sparklers' },
    { name: '15 CM GREEN SPARKLERS - Box', mrp: 250, price: 75, qty: 0, total: 0, category: 'Sparklers' },
    { name: '15 CM RED SPARKLERS - Box', mrp: 260, price: 78, qty: 0, total: 0, category: 'Sparklers' },
    { name: '30 CM ELECTRIC SPARKLERS - Box', mrp: 220, price: 66, qty: 0, total: 0, category: 'Sparklers' },
    { name: '30 CM COLOUR SPARKLERS - Box', mrp: 240, price: 72, qty: 0, total: 0, category: 'Sparklers' },
    { name: '30 CM GREEN SPARKLERS - Box', mrp: 250, price: 75, qty: 0, total: 0, category: 'Sparklers' },
    { name: '30 CM RED SPARKLERS - Box', mrp: 260, price: 78, qty: 0, total: 0, category: 'Sparklers' },
    { name: '50 CM ELECTRIC SPARKLERS (Tube) - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Sparklers' },
    { name: '50 CM COLOUR SPARKLERS (Tube) - Box', mrp: 900, price: 270, qty: 0, total: 0, category: 'Sparklers' },
    { name: 'CRACKLING COMETS - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Sparklers' },
    // Premium Sparklers
    { name: '15 CM MINGLE MIX - BOX', mrp: 600, price: 180, qty: 0, total: 0, category: 'Premium Sparklers' },
    { name: '30 CM MINGLE MIX - Box', mrp: 600, price: 180, qty: 0, total: 0, category: 'Premium Sparklers' },
    { name: '50 CM MINGLE MIX - Box', mrp: 1500, price: 450, qty: 0, total: 0, category: 'Premium Sparklers' },
    { name: 'ROTATING SPARKLERS - Box', mrp: 1100, price: 330, qty: 0, total: 0, category: 'Premium Sparklers' },

    // Twinkling Star Crackers
    { name: '1½ " TWINKLING STAR - Box', mrp: 110, price: 33, qty: 0, total: 0, category: 'Twinkling Star Crackers' },
    { name: '4" TWINKLING STAR - Box', mrp: 330, price: 99, qty: 0, total: 0, category: 'Twinkling Star Crackers' },

    // Aerial Fancy Assorted
    { name: '7 SHOT/ RED/ GREEN/ SILVER ROBO - BOX', mrp: 450, price: 135, qty: 0, total: 0, category: 'Aerial Fancy Assorted' },
    { name: 'DREAMS / PENTA - 5 PCS - Box', mrp: 475, price: 142.5, qty: 0, total: 0, category: 'Aerial Fancy Assorted' },
    { name: '4" FANCY MOKO CRACKLING (2 Pcs) - Box', mrp: 3750, price: 1125, qty: 0, total: 0, category: 'Aerial Fancy Assorted' },

    // Multi Shots Crackers
    { name: '12 SHOT RIDER - Box', mrp: 700, price: 210, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: 'MAGIZH KNIGHT RIDERS 25 - Box', mrp: 1100, price: 330, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '30 SHOTS - MULTI COLOUR - BOX', mrp: 2000, price: 600, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '60 SHOTS - MULTI COLOUR - BOX', mrp: 4000, price: 1200, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '120 SHOTS - MULTI COLOUR - Box', mrp: 8000, price: 2400, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '240 SHOTS - MULTI COLOUR - Box', mrp: 16000, price: 4800, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '500 SHOTS - MULTI COLOUR - Box', mrp: 32500, price: 9750, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '10x10 CELEBRATION SHOT - Box', mrp: 19000, price: 5700, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: 'BIG SETOUT - Box', mrp: 20000, price: 6000, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    { name: '288 SHOTS HAND GUN - Box', mrp: 7500, price: 2250, qty: 0, total: 0, category: 'Multi Shots Crackers' },
    // Rocket Crackers
    { name: 'BABY ROCKET - BOX', mrp: 200, price: 60, qty: 0, total: 0, category: 'Rocket Crackers' },
    { name: 'ROCKET BOMB - BOX', mrp: 325, price: 97.5, qty: 0, total: 0, category: 'Rocket Crackers' },
    { name: 'WHISTLING ROCKET - BOX', mrp: 475, price: 142.5, qty: 0, total: 0, category: 'Rocket Crackers' },

    // Aerial Fancy Crackers
    { name: 'BLACK AND WHITE SIZZLING 5 PCS - Box', mrp: 1100, price: 330, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: 'CHOTTA FANCY - Box', mrp: 225, price: 67.5, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: 'MAGIZH JOY - 1.75" FANCY - 3 PCS - BOX', mrp: 1100, price: 330, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '2" FANCY - Box', mrp: 450, price: 135, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '4" FANCY PIPE - 2 Pcs - Box', mrp: 3600, price: 1080, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '3.5" FANCY SINGLE - BOX', mrp: 1400, price: 420, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '3.5" FANCY DOUBLE BALL - BOX', mrp: 2250, price: 675, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '4" NIAGARA FANCY - PC', mrp: 1800, price: 540, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '6" FANCY PIPE - BOX', mrp: 3975, price: 1192.5, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '2" DOUBLE BALL - 2 PCS - Box', mrp: 2250, price: 675, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '2" TRIBLE BALL - 2 PCS - Box', mrp: 2490, price: 747, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },
    { name: '12 STEP FANCY - Box', mrp: 2250, price: 675, qty: 0, total: 0, category: 'Aerial Fancy Crackers' },

    // Fountain Crackers
    { name: 'MAGIZH MEGA PEACOCK - 3 FACE - Box', mrp: 900, price: 270, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH BADA PEACOCK - Box', mrp: 1900, price: 570, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH SNOW FALL - 2 Pcs - Box', mrp: 850, price: 255, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH TINGS - 2 Pcs - Box', mrp: 850, price: 255, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH 1000 K SIZZLING - 2 Pcs - Box', mrp: 850, price: 255, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH POPCORN - 2 Pcs - Box', mrp: 850, price: 255, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH TRI COLOR FOUNTAIN - BOX', mrp: 1100, price: 330, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH 6" WATERFALL FOUNTAIN - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH 6" SIZZLING FOUNTAIN - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH FANTASY FOUNTAINS - 5 PCS - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH RED RASPBERRY - 5 PCS - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH GREEN GARDEN - 5 PCS - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH BLUE ICE/POWER POT - 5 PCS - BOX', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH JIGARTHANDA TIN FOUNTAIN - Pc', mrp: 500, price: 150, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH VANILA TIN FOUNTAIN - Box', mrp: 500, price: 150, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'MAGIZH FALOODA TIN FOUNTAIN - Box', mrp: 500, price: 150, qty: 0, total: 0, category: 'Fountain Crackers' },
    { name: 'SUN/ STAR/ MOON/ POPS LIGHT - BOX', mrp: 350, price: 105, qty: 0, total: 0, category: 'Fountain Crackers' },

    // Fantasy Items
    { name: 'MAGIZH BAT AND BALL - BOX', mrp: 1000, price: 300, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'BLACK SERPHANTS - BOX', mrp: 725, price: 217.5, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH SWORD - Box', mrp: 550, price: 165, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH HEIST - Box', mrp: 1000, price: 300, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'SMOKY STICK - Box', mrp: 300, price: 90, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH GUN SQUAD - Box', mrp: 900, price: 270, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH DOUBLES - Box', mrp: 950, price: 285, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH FLASH CANDLE - 5 Pcs - Box', mrp: 450, price: 135, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH ULTRA CANDLE - 5 Pcs - Box', mrp: 500, price: 150, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'KIT KAT/ CHITPUT - Box', mrp: 120, price: 36, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'PHOTO SPLASH - BOX', mrp: 300, price: 90, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MINI SIREN - 5 PCS - Box', mrp: 600, price: 180, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'SIREN - 3 PCS - Box', mrp: 950, price: 285, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'ITOP BAMBARAM - BOX', mrp: 375, price: 112.5, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'BUTTERFLY - BOX', mrp: 350, price: 105, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'HELICOPTER - Box', mrp: 450, price: 135, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'DRONE - Box', mrp: 900, price: 270, qty: 0, total: 0, category: 'Fantasy Items' },
    { name: 'MAGIZH SMOKY - Box', mrp: 800, price: 240, qty: 0, total: 0, category: 'Fantasy Items' },

    // Matchbox Crackers
    { name: 'ANNAM DELUXE COLOUR MATCHES 3 IN 1 - BOX', mrp: 125, price: 37.5, qty: 0, total: 0, category: 'Matchbox Crackers' },
    { name: 'SAMRAT DELUXE 5 IN 1 - BOX', mrp: 400, price: 120, qty: 0, total: 0, category: 'Matchbox Crackers' },
    { name: 'PREMIUM MATCHES - 5 in 1 - Box', mrp: 750, price: 225, qty: 0, total: 0, category: 'Matchbox Crackers' },
    { name: 'PREMIUM MATCHES LABTOP 10 IN 1 - BOX', mrp: 1550, price: 465, qty: 0, total: 0, category: 'Matchbox Crackers' },

    // Gift Boxes - Magizh Premium Range
    { name: 'MAGIZH THE KING - GIFT BOX(21 Items)', mrp: 1800, price: 540, qty: 0, total: 0, category: 'Gift Boxes - Magizh Premium Range' },
    { name: 'MAGIZH LET\'S CELEBRATE - GIFT BOX(25 Items)', mrp: 2050, price: 615, qty: 0, total: 0, category: 'Gift Boxes - Magizh Premium Range' },
    { name: 'MAGIZH HUNTERS - GIFT BOX(30 Items)', mrp: 2700, price: 810, qty: 0, total: 0, category: 'Gift Boxes - Magizh Premium Range' },
    { name: 'MAGIZH BEAST - GIFT BOX (40 Items)', mrp: 4000, price: 1200, qty: 0, total: 0, category: 'Gift Boxes - Magizh Premium Range' },
    { name: 'MAGIZH DAMAAL DUMEEL - GIFT BOX(50 Items)', mrp: 5200, price: 1560, qty: 0, total: 0, category: 'Gift Boxes - Magizh Premium Range' },
    { name: 'MAGIZH MASTER - GIFT BOX(60 Items)', mrp: 7400, price: 2220, qty: 0, total: 0, category: 'Gift Boxes - Magizh Premium Range' },

  ];

  packagingChargeRate = 0.05;

  updateTotal(cracker: any) {
    cracker.total = (cracker.price * cracker.qty);
  }

  getGrandTotal() {
    let sum = this.crackers.reduce((acc, cracker) => acc + cracker.total, 0);
    return sum + (sum * 0.05);
  }


  generatePDF() {
    if (this.personForm.valid) {
      const pdf = new jsPDF();
      const title = 'Cracker Price List';
  
      // Personal Details from form
      const formData = this.personForm.value;
      const personalDetails = [
        ['Name', formData.name],
        ['Mobile No', formData.mobile_no],
        ['Address', formData.address],
        ['State', formData.state],
        ['City', formData.city]
      ];
  
      pdf.setFontSize(16);
      pdf.text(title, 14, 20);
  
      // Adding personal details to PDF
      pdf.setFontSize(12);
      autoTable(pdf, {
        head: [['Field', 'Details']],
        body: personalDetails,
        startY: 30,
        theme: 'grid'
      });
  
      const headers = [['S.No', 'Name', 'MRP', 'Price', 'qty', 'Total (₹)']];
      
      // Crackers Data
      const data = this.crackers
        .filter(cracker => cracker.qty > 0)
        .map((cracker, index) => [
          index + 1, // S.No
          cracker.name,
          cracker.mrp,
          cracker.price,
          cracker.qty,
          cracker.total
        ]);
  
      // Adding crackers table below personal details
      autoTable(pdf, {
        head: headers,
        body: data,
        startY: pdf.lastAutoTable.finalY + 10, // Continue after personal details table
      });
  
      // Grand Total
      const grandTotal = this.getGrandTotal();
      pdf.text(`Grand Total: ₹${grandTotal}`, 14, pdf.lastAutoTable.finalY + 10);
      
      // Save the PDF
      pdf.save( formData.name + '_cracker-price-list.pdf');
      // this.emailService.sendEmail(this.personForm.value).subscribe(
      //   response => {
      //     console.log('Email sent successfully!', response);
      //   },
      //   error => {
      //     console.error('Error sending email', error);
      //   }
      // );
    } else {
      // If the form isn't valid, show errors!
      this.personForm.markAllAsTouched();
    }
  }
  
}
