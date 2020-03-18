package react.semanticui.elements.loader

import utest._
import japgolly.scalajs.react.test._
import japgolly.scalajs.react.vdom.html_<^._
import react.semanticui.elements.label.Label

object LoaderTest extends TestSuite {
  val tests = Tests {
    test("render") {
      val loader = Loader()
      ReactTestUtils.withNewBodyElement { mountNode =>
        loader.renderIntoDOM(mountNode)
        assert(mountNode.innerHTML == """<div class="ui loader"></div>""")
      }
    }
    test("renderChild") {
      val loader = Loader(<.div("abc"))
      ReactTestUtils.withNewBodyElement { mountNode =>
        loader.renderIntoDOM(mountNode)
        assert(mountNode.innerHTML == """<div class="ui text loader"><div>abc</div></div>""")
      }
    }
    test("renderChild2") {
      val loader = Loader()(Label("abc"))
      ReactTestUtils.withNewBodyElement { mountNode =>
        loader.renderIntoDOM(mountNode)
        assert(
          mountNode.innerHTML == """<div class="ui text loader"><div class="ui label">abc</div></div>"""
        )
      }
    }
    test("renderAs") {
      val loader = Loader(as = <.a, inverted = true)
      ReactTestUtils.withNewBodyElement { mountNode =>
        loader.renderIntoDOM(mountNode)
        assert(mountNode.innerHTML == """<a class="ui inverted loader"></a>""")
      }
    }
  }
}
