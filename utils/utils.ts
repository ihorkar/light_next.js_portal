export default function isExistInArray(Array: any[], element: any): boolean {
    for(let i = 0; i < Array.length; i++){
      if(Array[i]._id === element._id) return true;
    }
    return false;
}
