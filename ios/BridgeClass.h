//
//  BridgeClass.h
//  sampleNative
//
//  Created by Neeraj PK on 11/04/20.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "SecondOpinion-Swift.h"
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

//@interface BridgeClass : NSObject<RCTBridgeModule>
@interface BridgeClass : RCTEventEmitter<RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
