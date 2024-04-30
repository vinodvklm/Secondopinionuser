//
//  DocumentPicker.swift
//  BaseProject
//
//  Created by Nidheesh venugopal on 26/06/20.
//

import Foundation
import UIKit
 var filePath:URL?
let defaults = UserDefaults.standard;
@objc @objcMembers class DocumentPicker:
NSObject,UIDocumentPickerDelegate,UIDocumentMenuDelegate,RCTBridgeModule {
  
  static let _singletonInstance = DocumentPicker()
  
 
  @objc class func sharedInstance() -> DocumentPicker {
      return DocumentPicker._singletonInstance
    }
  
  @objc func sampleFunction(identifier:NSString , completionHandler: (String , Bool) -> Void)
  {
      var str:String = "sample string"
    
      completionHandler(str,true)

  }
  @objc func launchDocumentPicker(identifier:NSString , completionHandler: (String , Bool) -> Void)
  {
      //var str:String = "sample  string from launch"
    var str:String = "\(filePath)"
    
      completionHandler(str,true)

  }
  @objc func getDocumentPath(place:NSString , completionHandler: (String , Bool) -> Void)
   {
      // var str:String = "sample string"
    var url = defaults.object(forKey: "path") as? String ?? String()
     var str:String = url
       completionHandler(str,true)

   }
  static func moduleName() -> String! {
    return "DocumentPicker"
  }
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  func documentMenu(_ documentMenu: UIDocumentMenuViewController, didPickDocumentPicker documentPicker: UIDocumentPickerViewController) {
    print("response")
    print(documentPicker)
  }
  
  
  //MARK: - UIDocumentPickerDelegate Methods
  
  func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentAt url: URL) {
     
      
     print("response is here")
    print(url)
    defaults.set(url, forKey: "path")
    filePath=url
   
   
    
  }
   
  func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
    defaults.removeObject(forKey: "path")
  
  }
 
  
  
  @objc
  func ShowPicker(_ message:NSString) -> Void {
    defaults.removeObject(forKey: "path")
     let importController: UIViewController
     if #available(iOS 11.0, *) {
      let documentPicker      = UIDocumentPickerViewController(documentTypes: ["org.nema.dicom"], in: .import)
                 documentPicker.delegate = self
                 
                 importController = documentPicker
    }
     else{
//      let documentMenu      = UIDocumentMenuViewController(documentTypes: ["org.nema.dicom"], in: .import)
//      documentMenu.delegate = self
//
//      documentMenu.addOption(withTitle: "URL", image: UIImage(named: "URL")!, order: .first) {
//      let enterURL = UIAlertController(title: "Import Data Set From URL", message: "Type in or enter the fully qualified URL of the data set to load", preferredStyle: .alert)
     
    //  }
      let documentPicker      = UIDocumentPickerViewController(documentTypes: ["org.nema.dicom"], in: .import)
                      documentPicker.delegate = self
      importController = documentPicker
      //importController = documentMenu
      
    }

    if UIDevice.current.userInterfaceIdiom == .pad {
        importController.modalPresentationStyle = .popover
    }
    DispatchQueue.main.async {
      (UIApplication.shared.delegate as! AppDelegate).window.rootViewController!.present(importController, animated: true, completion: nil);
    }
    //present(importController, animated: true, completion: nil)
  }
}
