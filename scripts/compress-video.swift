import AVFoundation
import Foundation

/**
 用法：
 swift scripts/compress-video.swift <input> <output> [preset]

 示例：
 swift scripts/compress-video.swift \
   "content/牡丹亭/预告片/Group 1 trailer/Group 1 trailer.mp4" \
   "content/牡丹亭/预告片/Group 1 trailer/Group 1 trailer.deploy.mp4" \
   "AVAssetExportPreset1280x720"

 说明：
 - 默认预设是 AVAssetExportPreset1280x720
 - 输出为可在网页直接播放的 mp4
 - 这个脚本主要用于把本地超大视频压缩成适合部署的版本
 */

let arguments = CommandLine.arguments

guard arguments.count >= 3 else {
  fputs("Usage: swift scripts/compress-video.swift <input> <output> [preset]\n", stderr)
  exit(1)
}

let inputPath = arguments[1]
let outputPath = arguments[2]
let presetName = arguments.count >= 4 ? arguments[3] : AVAssetExportPreset1280x720

let inputURL = URL(fileURLWithPath: inputPath)
let outputURL = URL(fileURLWithPath: outputPath)

let fileManager = FileManager.default
if fileManager.fileExists(atPath: outputURL.path) {
  try fileManager.removeItem(at: outputURL)
}

let asset = AVURLAsset(url: inputURL)

guard let exportSession = AVAssetExportSession(asset: asset, presetName: presetName) else {
  fputs("Failed to create AVAssetExportSession for preset \(presetName)\n", stderr)
  exit(2)
}

guard exportSession.supportedFileTypes.contains(.mp4) else {
  fputs("This preset does not support mp4 output for the given asset.\n", stderr)
  exit(3)
}

exportSession.outputURL = outputURL
exportSession.outputFileType = .mp4
exportSession.shouldOptimizeForNetworkUse = true

let semaphore = DispatchSemaphore(value: 0)

exportSession.exportAsynchronously {
  semaphore.signal()
}

_ = semaphore.wait(timeout: .distantFuture)

switch exportSession.status {
case .completed:
  let values = try? outputURL.resourceValues(forKeys: [.fileSizeKey])
  let fileSize = values?.fileSize ?? 0
  let fileSizeMB = Double(fileSize) / 1024.0 / 1024.0
  print("Export completed: \(outputPath)")
  print(String(format: "Size: %.2f MB", fileSizeMB))
case .failed:
  fputs("Export failed: \(exportSession.error?.localizedDescription ?? "Unknown error")\n", stderr)
  exit(4)
case .cancelled:
  fputs("Export cancelled.\n", stderr)
  exit(5)
default:
  fputs("Export ended with status: \(exportSession.status.rawValue)\n", stderr)
  exit(6)
}
