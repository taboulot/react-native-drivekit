package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.entity.TripPoint
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

fun mapStartMode(startMode: StartMode): String {
  var rnStartMode = when (startMode) {
    StartMode.UNKNOWN_BLUETOOTH -> "UNKNOWN_BLUETOOTH"
    StartMode.BEACON -> "BEACON"
    StartMode.BICYCLE_ACTIVITY -> "BICYCLE_ACTIVITY"
    StartMode.BLUETOOTH -> "BLUETOOTH"
    StartMode.GEOZONE -> "GEOZONE"
    StartMode.GPS -> "GPS"
    StartMode.MANUAL -> "MANUAL"
  }
  return rnStartMode
}

fun mapTripPoint(tripPoint: TripPoint): ReadableMap {
  var rnTripPoint = Arguments.createMap()
  rnTripPoint.putDouble("distance", tripPoint.distance)
  rnTripPoint.putDouble("accuracy", tripPoint.accuracy)
  rnTripPoint.putDouble("duration", tripPoint.duration)
  rnTripPoint.putDouble("heading", tripPoint.heading)
  rnTripPoint.putDouble("elevation", tripPoint.elevation)
  rnTripPoint.putDouble("latitude", tripPoint.latitude)
  rnTripPoint.putDouble("longitude", tripPoint.longitude)
  rnTripPoint.putDouble("speed", tripPoint.speed)
  return rnTripPoint
}
