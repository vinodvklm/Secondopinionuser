//
//  BridgeClass.m
//  sampleNative
//
//  Created by Neeraj PK on 11/04/20.
//
#import "React/RCTLog.h"
#import "BridgeClass.h"
#import <Foundation/Foundation.h>


@implementation BridgeClass
//+(id)allocWithZone:(struct _NSZone *)zone{
//  static BridgeClass *shared = nil;
//  static dispatch_once_t oneToken;
//  dispatch_once(&oneToken,^{shared=[super allocWithZone:zone];
//    
//  });
//  return shared;
//}

// This RCT (React) "macro" exposes the current module to JavaScript
RCT_EXPORT_MODULE();



//RCT_EXPORT_METHOD(startAdvertisingBleIos:(BOOL *)show
//                 resolver:(RCTPromiseResolveBlock)resolve
//                 rejecter:(RCTPromiseRejectBlock)reject)
//{
//  dispatch_async(dispatch_get_main_queue(), ^{
//
//    @try{
//
//      BLECentralObject *object = [BLECentralObject sharedInstance];
//      [object startBLEProcess];
//
//
//      resolve(@{ @"key": [NSNumber numberWithBool:1] });
//
//
//
//
//    }
//    @catch(NSException *exception){
//      reject(@"get_error",exception.reason, nil);
//    }
//  });
//}
RCT_EXPORT_METHOD(startAdvertisingBleIosWithIdentifier:(NSString *)identifier
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    @try{
    
      DocumentPicker *object = [DocumentPicker sharedInstance];
      [object sampleFunctionWithIdentifier:@"" completionHandler:^(NSString * string, BOOL d) {
        
        resolve(@{ @"key": [NSNumber numberWithBool:1],@"value":string });
        
      }];
      

    
      
    }
    @catch(NSException *exception){
      reject(@"get_error",exception.reason, nil);
    }
  });
}
RCT_EXPORT_METHOD(launchNativeDocumentPicker:(NSString *)identifier
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    @try{
    
      DocumentPicker *object = [DocumentPicker sharedInstance];
      [object ShowPicker:(@"show")];
      
      [object launchDocumentPickerWithIdentifier:@"" completionHandler:^(NSString * string, BOOL d) {

        resolve(@{ @"key": [NSNumber numberWithBool:1],@"value":string });

      }];
    

      
    }
    @catch(NSException *exception){
      reject(@"get_error",exception.reason, nil);
    }
  });
}

RCT_EXPORT_METHOD(getSavedDocumentPath:(NSString *)identifier
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    @try{
    
      DocumentPicker *object = [DocumentPicker sharedInstance];
      [object getDocumentPathWithPlace:@"" completionHandler:^(NSString * string, BOOL d) {
        
        resolve(@{ @"key": [NSNumber numberWithBool:1],@"value":string });
        
      }];

      
    }
    @catch(NSException *exception){
      reject(@"get_error",exception.reason, nil);
    }
  });
}

- (NSArray<NSString *> *)supportedEvents{
  return @"EventA";
}

@end
