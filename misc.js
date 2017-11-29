let title;
for (let i = 0; i < this.props.term.length; i++) {
   title = title + this.props.term[i];
  if (i === this.props.term.length - 1) {
    title = title + " - ";
   } else {
    title = " / ;"
   }
}
if (this.props.buildingName) {
  title = title + this.props.buildingName;
} else {
  title = title + this.props.housingType;
}
title = title + " - " + this.props.price;
